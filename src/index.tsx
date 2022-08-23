import { Form, ActionPanel, Action, showToast, getPreferenceValues } from "@raycast/api";
import path from "path";
import fetch from "node-fetch";

type Values = {
  name: string;
  folder: string;
  class: string;
};

export default function Command() {
  const classes = ["CSCI 140", "PHIL 101", "MEDG 101"];
  const loading = false;
  const classDropdownItems = classes.map((c) => <Form.Dropdown.Item value={c} title={c} />);
  async function handleSubmit(values: Values) {
    showToast({ title: "Creating document", message: "Starting" });
    const data = await fetch("https://neptune.api.mattglei.ch/note", {
      method: "POST",
      headers: { Authorization: "Bearer " + getPreferenceValues().token },
      body: JSON.stringify({
        name: values.name,
        folder: path.join("College", values.class, values.folder),
      }),
    });
    console.log(data);
    showToast({ title: "Created document", message: "Done" });
  }

  return (
    <Form
      isLoading={loading}
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" placeholder="Name" />
      <Form.TextField id="folder" title="Folder" placeholder="Folder" />
      <Form.Dropdown id="class" title="Class">
        {...classDropdownItems}
      </Form.Dropdown>
    </Form>
  );
}
