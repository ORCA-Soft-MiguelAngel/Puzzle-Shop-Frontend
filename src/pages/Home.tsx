import CategoriesTab from "@/components/home/CategoriesTab";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <main className="px-4 sm:px-10 py-10 lg:p-24">
        <CategoriesTab />
      </main>
    </MainLayout>
  );
}
