import { Award, Briefcase, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const skills = [
    "JavaScript / TypeScript",
    "React / Next.js",
    "Node.js",
    "HTML & CSS",
    "Tailwind CSS",
    "UI/UX Design",
    "Figma",
    "Git / GitHub",
  ];

  const timeline = [
    {
      icon: Briefcase,
      year: "2024 - Present",
      title: "Senior Developer",
      company: "Tech Company Inc.",
      description: "Leading frontend development and mentoring junior developers",
    },
    {
      icon: Briefcase,
      year: "2022 - 2024",
      title: "Full Stack Developer",
      company: "Creative Agency",
      description: "Built responsive web applications for diverse clients",
    },
    {
      icon: GraduationCap,
      year: "2018 - 2022",
      title: "Bachelor's Degree",
      company: "University Name",
      description: "Computer Science with focus on web development",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">About Me</h1>
              <p className="text-xl text-gray-600 mb-6">
                I'm a passionate developer and designer with a love for creating
                beautiful, functional web experiences that make a difference.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over 5 years of experience in web development, I specialize
                in building modern, responsive applications using cutting-edge
                technologies. I believe in writing clean, maintainable code and
                creating intuitive user interfaces.
              </p>
              <p className="text-lg text-gray-600">
                When I'm not coding, you'll find me exploring new design trends,
                contributing to open source, or sharing knowledge with the
                developer community.
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517530094915-500495b15ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBlcnNvbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc4MTQyNDUyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Profile"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md hover:border-blue-300 transition-all"
              >
                <p className="font-medium text-gray-900">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-xl text-gray-600">
              Career highlights and education
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative flex gap-6 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-600 font-medium mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      {item.company}
                    </p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
