"use client";

import { Code2, Paintbrush, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const teamMembers = [
  {
    name: "Sankalp Gaikwad",
    role: "Developer",
    icon: Code2,
  },
  {
    name: "Deepak Baditya",
    role: "Developer",
    icon: Code2,
  },
  {
    name: "Sahil Burud",
    role: "Documentation & Design",
    icon: FileText,
  },
  {
    name: "Mrunal Bhosale",
    role: "Documentation & Design",
    icon: FileText,
  },
];

const Team = () => {
    return (
        <div id="about" className="py-16 bg-muted/50 rounded-3xl mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground">
                The talented individuals behind Algorithm Visualizer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className="p-6 group hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-white/20">
                      <member.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Team;