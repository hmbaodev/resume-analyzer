import type { Route } from "./+types/upload";
import ResumeUploadForm from "@/components/resume-upload-form";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Upload Your Resume" }];
}

const Upload = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">
            Upload Your Resume
          </h1>
          <p className="text-base text-center">
            Drop your resume to get detailed feedback and improvement tips
          </p>
        </div>
        <ResumeUploadForm />
      </div>
    </section>
  );
};

export default Upload;
