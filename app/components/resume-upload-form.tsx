import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Recommended for descriptions
import { resumeUploadFromValidator } from "@/validators"; // Adjust path as needed

type ResumeFormValues = z.infer<typeof resumeUploadFromValidator>;

const ResumeUploadForm = () => {
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeUploadFromValidator),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      // resumeFile is left undefined for file inputs
    },
  });

  const onSubmit = (values: ResumeFormValues) => {
    // Logic will go here later
    console.log("Form Values:", values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-sm bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title (*)</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name (*)</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description (*)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the job requirements here..."
                    className="min-h-60"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume PDF Upload */}
          <FormField
            control={form.control}
            name="resumeFile"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Resume (PDF format) (*)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormDescription>Maximum file size: 20MB.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="lg"
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Upload Your Resume
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResumeUploadForm;
