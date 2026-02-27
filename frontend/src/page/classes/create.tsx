import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/components/refine-ui/views/create-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from "@hookform/resolvers/zod"
import { useBack } from '@refinedev/core';
import React from 'react';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import { classSchema } from '@/lib/schema';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UploadWidget from '@/components/upload-widget';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

type TeacherOption = {
  id: string;
  name: string;
};

type SubjectOption = {
  id: number;
  name: string;
  code: string;
};

const createSubjectCode = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.slice(0, 3))
    .join('')
    .toUpperCase();

const teachers: TeacherOption[] = [
  { id: 'teach-001', name: 'Amelia Reyes' },
  { id: 'teach-002', name: 'Malik Turner' },
  { id: 'teach-003', name: 'Priya Desai' },
];

const subjects: SubjectOption[] = [
  { id: 1, name: 'Computer Science', code: createSubjectCode('Computer Science') },
  { id: 2, name: 'Applied Mathematics', code: createSubjectCode('Applied Mathematics') },
  { id: 3, name: 'Modern Literature', code: createSubjectCode('Modern Literature') },
];
const Create = () => {
  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
        resource: 'classes',
        action: 'create'
    },
  
  });

  const { handleSubmit, control, formState: {isSubmitting, errors} } = form

   const onSubmit = (data: z.infer<typeof classSchema>) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }
  
  const bannerPublicId = form.watch("bannerCldPubId");
  const setBannerImage = (file, field) => {
    if(file){
      field.onChange(file.url);
      form.setValue("bannerCldPubId", file.publicId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      field.onChange("");
      form.setValue("bannerCldPubId", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }
  const back = useBack();

  return (
    <CreateView>
      <Breadcrumb  />
      <h1 className='page-title'>Create a Class</h1>

      <div className='intro-row'>
        <p>Provide the required information below to add a class.</p>
        <Button onClick={()=> back}>Back</Button>
      </div>
      <Separator />

      <div className='my-4 flex items-center'>
        <Card className='class-form-card'>
          <CardHeader className='relative z-10'>
            <CardTitle className='text-2xl pb-0 font-bold'>Fill out the Form</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className='mt-7'>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <FormField 
                control={control}
                name="bannerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Image<span className='text-orange-600'>*</span></FormLabel>
                    <FormControl>
                      <UploadWidget 
                       value ={field.value ? {url: field.value, publicId: bannerPublicId ?? ''}: null}
                       onChange={(file: any, field: any)=> setBannerImage(file, field)} />
                    </FormControl>
                    <FormMessage />
                    {errors.bannerCldPubId && !errors.bannerUrl && (
                      <p className="text-sm text-red-600 mt-1">{errors.bannerCldPubId.message?.toString}</p>
                    )}
                  </FormItem>
                )} />

                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name <span className='text-orange-600'>*</span></FormLabel>
                      <FormControl>
                        <input {...field} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                
                <div className='grid sm:grid-cols-2 gap-4'>
                   <FormField
                  control={control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject <span className='text-orange-600'>*</span></FormLabel>
                      <Select
                        onValueChange={(value)=> field.onChange(Number(value))}
                        value={field?.value ? field.value.toString() : undefined}
                      >
                      <FormControl>
                       <SelectTrigger className="w-full"> 
                        <SelectValue placeholder="Select a subject" />
                       </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id.toString()}>
                            {subject.name} ({subject.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                
                  <FormField
                  control={control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher <span className='text-orange-600'>*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field?.value || undefined}
                      >
                      <FormControl>
                       <SelectTrigger className="w-full"> 
                        <SelectValue placeholder="Select a teacher" />
                       </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Capacity <span className="text-orange-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="30"
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value ? Number(value) : undefined);
                            }}
                            value={(field.value as number | undefined) ?? ""}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description about the class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                 <Button type="submit" size="lg" className="w-full">
                  {isSubmitting ? (
                    <div className="flex gap-1">
                      <span>Creating Class...</span>
                      <Loader2 className="inline-block ml-2 animate-spin" />
                    </div>
                  ) : (
                    "Create Class"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

    </CreateView>
  );
}

export default Create;
