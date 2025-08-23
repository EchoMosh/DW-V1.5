import { Link } from "react-router-dom";
import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Glass } from "@/components/ui/Glass";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
  KanbanItem,
} from "@/components/ui/shadcn-io/kanban";
import { faker } from "@faker-js/faker";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Pre-generate example columns and users
const columns = [
  { id: faker.string.uuid(), name: "Planned", color: "#6B7280" },
  { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" },
  { id: faker.string.uuid(), name: "Done", color: "#10B981" },
];

type ExampleOwner = {
  id: string;
  name: string;
  image: string;
};

type ExampleFeature = KanbanItem & {
  name: string;
  startAt: Date;
  endAt: Date;
  owner?: ExampleOwner;
};

const users: ExampleOwner[] = Array.from({ length: 6 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  image: faker.image.avatar(),
}));

const exampleFeatures: ExampleFeature[] = Array.from({ length: 18 }).map(() => ({
  id: faker.string.uuid(),
  name: capitalize(faker.company.buzzPhrase()),
  startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
  endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
  column: faker.helpers.arrayElement(columns).id,
  owner: faker.helpers.arrayElement(users),
}));

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const Pipeline = () => {
  const [features, setFeatures] = useState<ExampleFeature[]>(exampleFeatures);

  return (
    <AuroraBackground className="min-h-dvh w-full overflow-hidden flex items-start justify-center bg-background text-foreground py-10">
      <div className="container mx-auto max-w-6xl px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Kanban</h1>
            <p className="text-muted-foreground max-w-2xl">
              Agile workflow visualization that actually works. Move tasks between columns with smooth animations, built for React teams using Next.js who value clean code and great user experiences.
            </p>
          </div>
          <Link
            to="/launchpad"
            className="text-sm text-sky-300 underline underline-offset-4"
          >
            Back to Dashboard
          </Link>
        </div>

        <KanbanProvider
          columns={columns}
          data={features}
          onDataChange={setFeatures}
          className="gap-6"
        >
          {(column) => (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <span>{column.name}</span>
                </div>
              </KanbanHeader>

              <KanbanCards id={column.id}>
                {(feature: ExampleFeature) => (
                  <KanbanCard
                    column={column.id}
                    id={feature.id}
                    key={feature.id}
                    name={feature.name}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="m-0 flex-1 font-medium text-sm">
                          {feature.name}
                        </p>
                      </div>
                      {feature.owner && (
                        <Avatar className="h-4 w-4 shrink-0">
                          <AvatarImage src={feature.owner.image} />
                          <AvatarFallback>
                            {feature.owner.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <p className="m-0 text-muted-foreground text-xs">
                      {shortDateFormatter.format(feature.startAt)} -{" "}
                      {dateFormatter.format(feature.endAt)}
                    </p>
                  </KanbanCard>
                )}
              </KanbanCards>
            </KanbanBoard>
          )}
        </KanbanProvider>

        <div className="text-xs text-muted-foreground">
          Powered by{" "}
          <a
            className="underline underline-offset-4"
            href="https://dndkit.com/"
            target="_blank"
            rel="noreferrer"
          >
            DND Kit
          </a>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Pipeline;
