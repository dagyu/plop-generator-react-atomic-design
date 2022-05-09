import { NodePlopAPI } from "node-plop";
import { name } from "../package.json";

function rel(path: string) {
  return `${require.resolve(name)}/../../${path}`;
}

const generator = (plop: NodePlopAPI): void => {
  plop.setPartial(
    "folder",
    "{{#if group}}{{pascalCase group}}{{else}}{{pascalCase name}}{{/if}}",
  );
  plop.setGenerator("atomic-design", {
    prompts: [
      {
        type: "list",
        name: "type",
        message: "component type",
        choices: ["Atom", "Molecule", "Organism", "Template", "Page"],
      },
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
      {
        type: "input",
        name: "group",
        message: "Folder",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{pascalCase type}}/{{> folder}}/{{pascalCase name}}.tsx",
        templateFile: rel("./templates/components.hbs"),
      },
      {
        type: "add",
        path: "src/{{pascalCase type}}/{{> folder}}/{{pascalCase name}}.stories.tsx",
        templateFile: rel("./templates/stories.hbs"),
      },
    ],
  });
};

export default generator;
