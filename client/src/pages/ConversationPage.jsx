// ConversationPage.jsx (Modified)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/Loader';
import { Empty } from '@/components/Empty';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';

const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const userMessage = { role: 'user', content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await api.post('/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <div className="col-span-12 lg:col-span-10">
                <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="How do I calculate the radius of a circle?"
                    {...form.register('prompt')}
                />
            </div>
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'p-8 w-full flex items-start gap-x-8 rounded-lg',
                  message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
