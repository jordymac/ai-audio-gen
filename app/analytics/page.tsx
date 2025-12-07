"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import { analyticsData } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState("all-time");

  const getTrendIcon = (trend: number) => {
    if (trend > 0)
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend < 0)
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "good":
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      case "needs_work":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getRejectionTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-600" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-600">
          Monitor performance metrics and identify areas for improvement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              First-Pass Approval Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {analyticsData.key_metrics.first_pass_approval.value}%
                </p>
                <div
                  className={`flex items-center gap-1 text-sm mt-1 ${getTrendColor(
                    analyticsData.key_metrics.first_pass_approval.trend
                  )}`}
                >
                  {getTrendIcon(
                    analyticsData.key_metrics.first_pass_approval.trend
                  )}
                  <span className="font-medium">
                    {analyticsData.key_metrics.first_pass_approval.trend > 0
                      ? "+"
                      : ""}
                    {analyticsData.key_metrics.first_pass_approval.trend}%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Turnaround Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {analyticsData.key_metrics.avg_turnaround_min.value} min
                </p>
                <div
                  className={`flex items-center gap-1 text-sm mt-1 ${getTrendColor(
                    analyticsData.key_metrics.avg_turnaround_min.trend
                  )}`}
                >
                  {getTrendIcon(
                    analyticsData.key_metrics.avg_turnaround_min.trend
                  )}
                  <span className="font-medium">
                    {analyticsData.key_metrics.avg_turnaround_min.trend > 0
                      ? "+"
                      : ""}
                    {analyticsData.key_metrics.avg_turnaround_min.trend} min
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Overall Approval Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {analyticsData.key_metrics.overall_approval.value}%
                </p>
                <div
                  className={`flex items-center gap-1 text-sm mt-1 ${getTrendColor(
                    analyticsData.key_metrics.overall_approval.trend
                  )}`}
                >
                  {getTrendIcon(
                    analyticsData.key_metrics.overall_approval.trend
                  )}
                  <span className="font-medium">
                    {analyticsData.key_metrics.overall_approval.trend > 0
                      ? "+"
                      : ""}
                    {analyticsData.key_metrics.overall_approval.trend}%
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Approval Rate Trend (12 Weeks)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.approval_trend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis
                  dataKey="week"
                  className="text-xs"
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "#6b7280" }}
                  domain={[50, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={{ fill: "#9333ea", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.genres.map((genre, index) => (
                <div
                  key={genre.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-lg font-semibold text-gray-400 w-6">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{genre.name}</span>
                        {getStatusIcon(genre.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{genre.count} generations</span>
                        <span>•</span>
                        <span className="font-medium">{genre.approval}% approval</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        genre.approval >= 85
                          ? "default"
                          : genre.approval >= 75
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        genre.approval >= 85
                          ? "bg-green-600"
                          : genre.approval >= 75
                          ? "bg-blue-600"
                          : "bg-orange-600 text-white"
                      }
                    >
                      {genre.approval}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.rejection_reasons}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis
                    dataKey="reason"
                    type="category"
                    width={120}
                    className="text-xs"
                    tick={{ fill: "#6b7280" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="count" fill="#9333ea" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border-purple-200 bg-purple-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            <CardTitle>AI Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <p className="text-sm font-medium mb-2">
              Improve City Pop Generation Success Rate
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Based on recent data, "Tempo too fast" is the most common rejection
              reason. Consider adjusting the City Pop prompt template to default to
              a slightly slower BPM (~95-100 instead of 100-105).
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Badge variant="outline" className="text-xs">
                Expected impact: +5-8% approval rate
              </Badge>
              <Badge variant="outline" className="text-xs">
                Confidence: High
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-3 w-3 mr-2" />
              View Full Analysis
            </Button>
            <Button variant="outline" size="sm" className="text-purple-600">
              Apply Suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" size="lg">
          <FileText className="h-4 w-4 mr-2" />
          View Detailed Report
        </Button>
        <Button variant="outline" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Export Data (CSV)
        </Button>
      </div>
    </div>
  );
}
