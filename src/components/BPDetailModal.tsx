import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Droplets } from "lucide-react";

interface BPDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const bpData3Days = [
  { time: "Day 1", systolic: 118, diastolic: 78 },
  { time: "Day 2", systolic: 122, diastolic: 80 },
  { time: "Day 3", systolic: 120, diastolic: 79 },
];

const bpData7Days = [
  { time: "Mon", systolic: 118, diastolic: 78 },
  { time: "Tue", systolic: 122, diastolic: 80 },
  { time: "Wed", systolic: 125, diastolic: 82 },
  { time: "Thu", systolic: 120, diastolic: 79 },
  { time: "Fri", systolic: 115, diastolic: 75 },
  { time: "Sat", systolic: 112, diastolic: 72 },
  { time: "Sun", systolic: 119, diastolic: 77 },
];

const bpData1Month = [
  { time: "Week 1", systolic: 120, diastolic: 79 },
  { time: "Week 2", systolic: 118, diastolic: 77 },
  { time: "Week 3", systolic: 122, diastolic: 81 },
  { time: "Week 4", systolic: 117, diastolic: 76 },
];

export const BPDetailModal = ({ open, onOpenChange, timeRange, onTimeRangeChange }: BPDetailModalProps) => {
  const getData = () => {
    switch (timeRange) {
      case "3days": return bpData3Days;
      case "7days": return bpData7Days;
      case "1month": return bpData1Month;
      default: return bpData7Days;
    }
  };

  const data = getData();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-purple-700">
            <Droplets className="h-6 w-6 mr-2" />
            Blood Pressure Analysis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex space-x-2">
            <Button
              variant={timeRange === "3days" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange("3days")}
              className="text-xs"
            >
              3 Days
            </Button>
            <Button
              variant={timeRange === "7days" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange("7days")}
              className="text-xs"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === "1month" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange("1month")}
              className="text-xs"
            >
              1 Month
            </Button>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-2xl font-bold text-purple-700">120/80</p>
              <p className="text-sm text-purple-600">Current</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-700">119/78</p>
              <p className="text-sm text-green-600">Average</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg font-bold text-blue-700">Optimal</p>
              <p className="text-sm text-blue-600">Status</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[60, 140]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value, name) => [
                    `${value} mmHg`,
                    name === 'systolic' ? 'Systolic' : 'Diastolic'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#9333ea" 
                  strokeWidth={3}
                  dot={{ fill: '#9333ea', r: 4 }}
                  activeDot={{ r: 6, fill: '#9333ea' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#c084fc" 
                  strokeWidth={3}
                  dot={{ fill: '#c084fc', r: 4 }}
                  activeDot={{ r: 6, fill: '#c084fc' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Systolic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Diastolic</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};