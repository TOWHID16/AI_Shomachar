// MusicPage.jsx (Modified)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Music } from 'lucide-react';

import api from '@/lib/api';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/Loader';
import { Empty } from '@/components/Empty';

const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Music prompt is required' }),
});

const MusicPage = () => {
  const [music, setMusic] = useState();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      setMusic(undefined);
      const response = await api.post('/music', values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
              placeholder="Piano solo"
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
        {!music && !isLoading && (
          <Empty label="No music generated." />
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MusicPage;