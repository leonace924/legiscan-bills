import Bills from "@/components/bills-list";

export default function Home() {
  return (
    <>
      <div className="flex flex-col mb-6 lg:mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-700">
          Legiscan Bills (Georgia)
        </h1>
        <p className="mt-4 text-lg text-center">
          A simple example of searching bills using Legiscan API with Next.js
        </p>
      </div>

      <Bills />
    </>
  );
}
