"use client";

import * as React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Glass } from "@/components/ui/Glass";

export type KanbanColumn = {
  id: string;
  name: string;
  color?: string;
};

export type KanbanItem = {
  id: string;
  column: string;
  // Allow any additional fields on items
  [key: string]: any;
};

type KanbanContextType<T extends KanbanItem = KanbanItem> = {
  columns: KanbanColumn[];
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const KanbanContext = React.createContext<KanbanContextType<any> | null>(null);

function useKanban<T extends KanbanItem = KanbanItem>() {
  const ctx = React.useContext(KanbanContext) as KanbanContextType<T> | null;
  if (!ctx) {
    throw new Error("Kanban components must be used within a KanbanProvider");
  }
  return ctx;
}

type KanbanProviderProps<T extends KanbanItem = KanbanItem> = {
  columns: KanbanColumn[];
  data: T[];
  onDataChange: (next: T[]) => void;
  className?: string;
  children: (column: KanbanColumn) => React.ReactNode;
};

export function KanbanProvider<T extends KanbanItem = KanbanItem>({
  columns,
  data,
  onDataChange,
  className,
  children,
}: KanbanProviderProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [internalData, setInternalData] = React.useState<T[]>(data);

  // Keep internal data in sync with external data
  React.useEffect(() => {
    setInternalData(data);
  }, [data]);

  const setData = React.useCallback<
    React.Dispatch<React.SetStateAction<T[]>>
  >(
    (updater) => {
      setInternalData((prev) => {
        const next = typeof updater === "function" ? (updater as any)(prev) : updater;
        onDataChange(next);
        return next;
      });
    },
    [onDataChange]
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      setActiveId(String(active.id));
    },
    []
  );

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeType = active.data.current?.type as "card" | "column" | undefined;
      if (activeType !== "card") return;

      const activeId = String(active.id);
      const overType = over.data.current?.type as "card" | "column" | undefined;

      let overColumnId: string | null = null;
      if (overType === "card") {
        overColumnId = over.data.current?.columnId ?? null;
      } else if (overType === "column") {
        overColumnId = String(over.id);
      }
      if (!overColumnId) return;

      setData((prev) => {
        const current = prev.find((i) => i.id === activeId);
        if (!current || current.column === overColumnId) return prev;
        // Move to target column (append by default)
        return prev.map((i) => (i.id === activeId ? { ...i, column: overColumnId as string } : i));
      });
    },
    [setData]
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      if (!over) return;
      if (active.id === over.id) return;

      const activeType = active.data.current?.type as "card" | "column" | undefined;
      if (activeType !== "card") return;

      const overType = over.data.current?.type as "card" | "column" | undefined;
      const activeId = String(active.id);
      const targetColumnId =
        overType === "card"
          ? (over.data.current?.columnId as string)
          : (String(over.id) as string);

      setData((prev) => {
        // Ensure active item is in the target column
        let next = prev.map((i) => (i.id === activeId ? { ...i, column: targetColumnId } : i));

        // If dropped over a card, reorder relative positions
        if (overType === "card") {
          const overId = String(over.id);
          const activeIndex = next.findIndex((i) => i.id === activeId);
          const overIndex = next.findIndex((i) => i.id === overId);
          if (activeIndex !== -1 && overIndex !== -1) {
            next = arrayMove(next, activeIndex, overIndex);
          }
        }

        return next;
      });
    },
    [setData]
  );

  const value = React.useMemo(
    () => ({ columns, data: internalData, setData, activeId, setActiveId }) as KanbanContextType<T>,
    [columns, internalData, setData, activeId]
  );

  return (
    <KanbanContext.Provider value={value}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start",
            className
          )}
        >
          {columns.map((c) => (
            <React.Fragment key={c.id}>{children(c)}</React.Fragment>
          ))}
        </div>
      </DndContext>
    </KanbanContext.Provider>
  );
}

type KanbanBoardProps = {
  id: string;
  className?: string;
  children?: React.ReactNode;
};

export function KanbanBoard({ id, className, children }: KanbanBoardProps) {
  // Make entire board a droppable target
  const { setNodeRef } = useDroppable({
    id,
    data: { type: "column" },
  });

  return (
    <Glass
      ref={setNodeRef}
      variant="card"
      className={cn(
        // Glassmorphic column styling
        "flex min-h-[320px] flex-col overflow-hidden border-white/20 bg-white/5 p-2 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-white/5",
        "backdrop-blur-lg",
        className
      )}
    >
      {children}
    </Glass>
  );
}

type KanbanHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function KanbanHeader({ className, ...props }: KanbanHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-2 rounded-md px-3 py-2",
        // subtle glossy top
        "bg-gradient-to-b from-white/20 to-transparent dark:from-white/10",
        "text-sm font-medium"
      , className)}
      {...props}
    />
  );
}

type KanbanCardsProps<T extends KanbanItem = KanbanItem> = {
  id: string; // column id
  className?: string;
  children: (item: T) => React.ReactNode;
};

export function KanbanCards<T extends KanbanItem = KanbanItem>({
  id: columnId,
  className,
  children,
}: KanbanCardsProps<T>) {
  const { data } = useKanban<T>();
  const items = React.useMemo(
    () => data.filter((i) => i.column === columnId) as T[],
    [data, columnId]
  );
  const itemIds = React.useMemo(() => items.map((i) => i.id), [items]);

  return (
    <div className={cn("mt-1 flex flex-col gap-2", className)}>
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <React.Fragment key={item.id}>{children(item)}</React.Fragment>
        ))}
      </SortableContext>
    </div>
  );
}

type KanbanCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  column: string;
  name?: string;
};

export function KanbanCard({ id, column, className, children, ...props }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: "card", columnId: column },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Glass
        variant="card"
        className={cn(
          "group relative border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-3 shadow-md hover:shadow-xl",
          "backdrop-blur-xl transition-all",
          "dark:border-white/10 dark:from-white/10 dark:to-white/5",
          isDragging && "scale-[1.02] ring-2 ring-sky-300/60",
          className
        )}
        {...attributes}
        {...listeners}
        {...props}
      >
        {children}
      </Glass>
    </div>
  );
}
