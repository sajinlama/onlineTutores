"use client";

import { TrendingUp, Award, Mail, Sparkles, BookOpen, BookCheck, ShieldAlert, GraduationCap } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const username = localStorage.getItem('name') || "Student";
  const useremail = localStorage.getItem('email') || "student@edumentor.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getTotal', {
          credentials: "include"
        });
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] flex flex-col justify-center items-center gap-3 font-sans antialiased">
        <div className="w-10 h-10 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Compiling Analytics...</span>
      </div>
    );
  }

  const mathsScore = userData?.subjects?.maths?.totalScore ?? 0;
  const scienceScore = userData?.subjects?.science?.totalScore ?? 0;
  const englishScore = userData?.subjects?.english?.totalScore ?? 0;
  const totalMarks = mathsScore + scienceScore + englishScore;

  const chartData = [
    { subject: "maths", score: mathsScore, fill: "#4f46e5" }, 
    { subject: "science", score: scienceScore, fill: "#0d9488" }, 
    { subject: "english", score: englishScore, fill: "#ea580c" } 
  ];

  const chartConfig: ChartConfig = {
    score: { label: "Score" },
    maths: { label: "Mathematics", color: "#4f46e5" },
    science: { label: "Science", color: "#0d9488" },
    english: { label: "English", color: "#ea580c" }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased relative overflow-x-hidden p-6 md:p-10 transition-colors duration-300">
      
      {/* Background Decorative Mesh Flares */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Full-Width Container */}
      <div className="w-full max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Full Width Navigation Banner */}
        <div className="w-full bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center text-white dark:text-black font-bold text-xl shadow-sm group hover:rotate-3 transition-transform duration-300">
                {username?.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{username}</h2>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Active Student
                  </div>
                </div>
                <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 gap-1.5">
                  <Mail className="h-4 w-4 opacity-70" />
                  <span>{useremail}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>Academic Workspace Optimized</span>
            </div>
          </div>
        </div>
  
        {/* Grid Layout: Main Performance Graph + Secondary Informational Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Chart Wrapper - Occupies 7 units of space on large displays */}
          <div className="lg:col-span-7 h-full">
            <Card className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col justify-between transition-all duration-300">
              <CardHeader className="items-center pb-2 border-b border-zinc-100 dark:border-zinc-900/60 p-6">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800 mb-2">
                  <Award className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Subject Performance Metrics</CardTitle>
                <CardDescription className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  <span className="flex items-center gap-1"><BookCheck className="h-3.5 w-3.5 text-zinc-400" /> Average Score: <strong className="text-zinc-800 dark:text-zinc-200">{userData?.overallPerformance?.averageScore ?? 0}</strong></span>
                  <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-zinc-400" /> Cumulative Marks: <strong className="text-zinc-800 dark:text-zinc-200">{totalMarks}</strong></span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center py-14 relative flex-1">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-full max-w-[260px] [&_.recharts-text]:fill-background"
                >
                  <PieChart>
                    <ChartTooltip
                      content={<ChartTooltipContent nameKey="score" className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" />}
                    />
                    <Pie data={chartData} dataKey="score" nameKey="subject" innerRadius={5} strokeWidth={3} stroke={themeInsideCssHack()}>
                      <LabelList
                        dataKey="subject"
                        className="fill-white dark:fill-zinc-100 font-semibold"
                        stroke="none"
                        fontSize={11}
                   formatter={(value:any) => String(chartConfig[value as string]?.label ?? value).substring(0, 5)}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>

              <CardFooter className="flex-col gap-4 text-sm bg-zinc-50/50 dark:bg-zinc-900/20 p-6 border-t border-zinc-100 dark:border-zinc-900/60">
                {/* Custom Legend Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                  <div className="flex items-center justify-between sm:justify-start gap-3 p-3 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Mathematics</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 ml-auto">{mathsScore}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 p-3 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Science</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 ml-auto">{scienceScore}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 p-3 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">English</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 ml-auto">{englishScore}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar Insights Panel - Occupies 5 units of space */}
          <div className="lg:col-span-5 space-y-4 h-full flex flex-col">
            
            {/* Strongest Area Widget */}
            <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-md flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 block">Strongest Subject Field</span>
                <h3 className="text-lg font-bold capitalize text-zinc-800 dark:text-zinc-100">
                  {userData?.overallPerformance?.strongestSubject || "Not Evaluated"}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                <TrendingUp className="h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
              </div>
            </div>

            {/* Weakest Area Widget */}
            <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-md flex items-center justify-between group hover:border-orange-500/30 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 block">Requires Attention</span>
                <h3 className="text-lg font-bold capitalize text-zinc-800 dark:text-zinc-100">
                  {userData?.overallPerformance?.weakestSubject || "Not Evaluated"}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 flex items-center justify-center shadow-inner">
                <ShieldAlert className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Course Progress Information Card */}
            <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-md flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold text-sm tracking-tight">
                  <GraduationCap className="h-4 w-4 text-purple-500" />
                  <span>EduMentor Pipeline Insight</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Your metrics are updated live using performance tracking across active diagnostic mock tasks. Focus additional structural hours towards your weaker frameworks to safely normalize the distribution curve.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Data sync state: verified</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function themeInsideCssHack() {
  if (typeof window !== "undefined") {
    return window.document.documentElement.classList.contains("dark") ? "#09090b" : "#ffffff";
  }
  return "#ffffff";
}

export default Dashboard;