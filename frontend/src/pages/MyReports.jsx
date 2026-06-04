import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/ReportCard";

export default function MyReports() {
  return (
    <MainLayout>

      <div>

        <h1 className="mb-6 text-3xl font-bold">
          My Reports
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <ReportCard />
          <ReportCard />
          <ReportCard />

        </div>

      </div>

    </MainLayout>
  );
}