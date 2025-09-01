// ImagePage.jsx (Modified)
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Download, ImageIcon } from 'lucide-react';

import api from '@/lib/api';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/Button';
import { Card, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/Loader';
import { Empty } from '@/components/Empty';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Photo prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

const amountOptions = [
  { value: "1", label: "1 Photo" },
  { value: "2", label: "2 Photos" },
  { value: "3", label: "3 Photos" },
  { value: "4", label: "4 Photos" },
  { value: "5", label: "5 Photos" }
];

const resolutionOptions = [
  { value: "256x256", label: "256x256" },
  { value: "512x512", label: "512x512" },
  { value: "1024x1024", label: "1024x1024" },
];

const ImagePage = () => {
  const [photos, setPhotos] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      setPhotos([]);
      const response = await api.post('/image', values);
      const urls = response.data.map((image) => image.url);
      setPhotos(urls);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <div className="col-span-12 lg:col-span-6">
            <Input
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              disabled={isLoading}
              placeholder="A picture of a horse in Swiss alps"
              {...form.register('prompt')}
            />
          </div>
          <div className="col-span-12 lg:col-span-2">
            <Controller
              name="amount"
              control={form.control}
              render={({ field }) => (
                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {amountOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="col-span-12 lg:col-span-2">
            <Controller
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {resolutionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading}>
            Generate
          </Button>
        </form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <img
                  className="w-full h-full object-cover"
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src, '_blank')} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;