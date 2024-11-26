import { useQueryState } from "nuqs";

export default function Card() {
  const [title, setTitle] = useQueryState("title", {
    defaultValue: "Untitled-1",
  });
  const [code, setCode] = useQueryState("code", {
    defaultValue: "Hello World",
  });
  return (
    <>
      <div className="flex flex-col">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-red-900 rounded-t-lg w-full p-3 focus:outline-none"
        />

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-64 min-w-96 text-black resize-none rounded-b-lg bg-zinc-600 p-3 focus:outline-none"
        >
          {code}
        </textarea>
      </div>
    </>
  );
}
