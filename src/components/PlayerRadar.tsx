"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

interface SkillData {
  skill: string
  value: number
  fullMark: number
}

interface PlayerRadarProps {
  data?: SkillData[]
}

const defaultData: SkillData[] = [
  { skill: "Aim", value: 97, fullMark: 100 },
  { skill: "Reflexes", value: 95, fullMark: 100 },
  { skill: "Strategy", value: 88, fullMark: 100 },
  { skill: "Teamwork", value: 85, fullMark: 100 },
  { skill: "Consistency", value: 93, fullMark: 100 },
  { skill: "Clutch", value: 96, fullMark: 100 },
]

export default function PlayerRadar({ data = defaultData }: PlayerRadarProps) {
  return (
    <div className="h-[320px] w-full sm:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="rgba(99,102,241,0.2)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Player"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.2}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
