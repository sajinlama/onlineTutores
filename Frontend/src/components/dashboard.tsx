"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('name');
  const useremail = localStorage.getItem('email');

console.log('name:', username);
console.log('email:', useremail);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getTotal');
        const data = await response.json();
        setUserData(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="w-full flex justify-center items-center h-64">Loading...</div>;
  }

  if (!userData) {
    return <div className="w-full flex justify-center items-center h-64">No data available</div>;
  }

  // Calculate total marks of all subjects
  const totalMarks = 
    userData.subjects.maths.totalScore + 
    userData.subjects.science.totalScore + 
    userData.subjects.english.totalScore;

  // Prepare chart data from the subject scores with custom colors
  const chartData = [
    { subject: "maths", score: userData.subjects.maths.totalScore, fill: "#4C51BF" }, // Indigo
    { subject: "science", score: userData.subjects.science.totalScore, fill: "#38B2AC" }, // Teal
    { subject: "english", score: userData.subjects.english.totalScore, fill: "#ED8936" } // Orange
  ];

  const chartConfig = {
    score: {
      label: "Score",
    },
    maths: {
      label: "Mathematics",
      color: "#4C51BF", // Indigo
    },
    science: {
      label: "Science",
      color: "#38B2AC", // Teal
    },
    english: {
      label: "English",
      color: "#ED8936", // Orange
    }
  };

  return (
    <>
      <div className="w-[70vw] h-[calc(100vh-55px)] flex flex-col mx-4 gap-2">
        <div className="w-full bg-white border-b border-gray-200 shadow-sm rounded-sm dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{username}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500 dark:text-gray-50">{useremail}</p>
                </div>
              </div>

              <div className="bg-black rounded-2xl flex justify-center items-center text-white h-12 w-12 text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200">
                <div>{username?.charAt(0)}</div>
              </div>
            </div>
          </div>
        </div>
  
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription className="flex flex-col items-center">
              <div>Average Score: {userData.overallPerformance.averageScore}</div>
              <div className="font-semibold mt-1">Total Marks: {totalMarks}</div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="score" />}
                />
                <Pie data={chartData} dataKey="score" nameKey="subject">
                  <LabelList
                    dataKey="subject"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value) => chartConfig[value]?.label || value}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Strongest subject: {userData.overallPerformance.strongestSubject} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Weakest subject: {userData.overallPerformance.weakestSubject}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 w-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4C51BF" }}></div>
                <span>Maths: {userData.subjects.maths.totalScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#38B2AC" }}></div>
                <span>Science: {userData.subjects.science.totalScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ED8936" }}></div>
                <span>English: {userData.subjects.english.totalScore}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Dashboard;