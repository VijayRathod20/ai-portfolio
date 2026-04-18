"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences, education } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            3+ years of building scalable, production-grade applications and AI-powered solutions.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative space-y-8">
          {/* Timeline Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[12px] top-1 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>

              {/* Content Card */}
              <div
                className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
                }`}
              >
                <div className="glass rounded-2xl p-6 transition-all hover:border-accent/50">
                  <div className="mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-accent">
                      {exp.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Used */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h3 className="mb-8 text-center text-xl font-semibold">
            <GraduationCap className="mr-2 inline-block h-5 w-5 text-accent" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="glass rounded-2xl p-6 text-center transition-all hover:border-accent/50"
              >
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="mt-1 text-xs text-accent">{edu.duration}</p>
                {edu.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
