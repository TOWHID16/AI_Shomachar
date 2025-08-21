// VideoPage.jsx (Modified)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { VideoIcon } from 'lucide-react';

import api from '@/lib/api';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/Loader';
import { Empty } from '@/components/Empty';

const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Video prompt is required' }),
});

const VideoPage = () => {
  const [video, setVideo] = useState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      setVideo(undefined);
      const response = await api.post('/video', values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <div className="col-span-12 lg:col-span-10">
            <Input
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              disabled={isLoading}
              placeholder="Clown fish swimming in a coral reef"
              {...form.register('prompt')}
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
        {!video && !isLoading && (
          <Empty label="No video generated." />
        )}
        {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPage;