// LandingContent.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback } from './ui/Avatar'; // Assuming Avatar component exists

const testimonials = [
    {
      name: "Swadesh",
      avatar: "SN",
      title: "Software Engineer",
      description: "This is the best application I've ever used!"
    },
    {
      name: "Saroj",
      avatar: "SS",
      title: "Designer",
      description: "I use this daily for generating new photos!"
    },
    {
      name: "Santosh",
      avatar: "SD",
      title: "CEO",
      description:
        "This app has changed my life, cannot imagine working without it!"
    },
    {
      name: "Kanha",
      avatar: "SP",
      title: "CFO",
      description: "The best in class, definitely worth the premium subscription!"
    }
  ];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <div className="flex flex-row items-center">
                 {/* This Avatar component needs to be created or imported */}
                 <div className="w-10 h-10 mr-4 bg-gray-600 rounded-full flex items-center justify-center font-bold text-white">
                    {item.avatar}
                 </div>
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </CardTitle>
              </div>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};