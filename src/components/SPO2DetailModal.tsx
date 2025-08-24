import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity as Pulse } from "lucide-react";

interface SPO2DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const spo2Data3Days = [
  { time: "Day 1", spo2: 98 },
  { time: "Day 2", spo2: 97 },
  { time: "Day 3", spo2: 99 },
];

const spo2Data7Days = [
  { time: "Mon", spo2: 98 },
  { time: "Tue", spo2: 97 },
  { time: "Wed", spo2: 99 },
  { time: "Thu", spo2: 98 },
  { time: "Fri", spo2: 99 },
  { time: "Sat", spo2: 98 },
  { time: "Sun", spo2: 97 },
];

const spo2Data1Month = [
  { time: "Week 1", spo2: 98 },
  { time: "Week 2", spo2: 97 },
  { time: "Week 3", spo2: 99 },
  { time: "Week 4", spo2: 98 },
];

export const SPO2DetailModal = ({ open, onOpenChange, timeRange, onTimeRangeChange }: SPO2DetailModalProps) => {
  const getData = () => {
    switch (timeRange) {
      case "3days": return spo2Data3Days;
      case "7days": return spo2Data7Days;
      case "1month": return spo2Data1Month;
      default: return spo2Data7Days;
    }
  };

  const data = getData();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-cyan-700">
            <Pulse className="h-6 w-6 mr-2" />
            SpO2 (Blood Oxygen) Analysis
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
            <div className="text-center p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <p className="text-2xl font-bold text-cyan-700">98%</p>
              <p className="text-sm text-cyan-600">Current</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-700">98.1%</p>
              <p className="text-sm text-green-600">Average</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg font-bold text-blue-700">Excellent</p>
              <p className="text-sm text-blue-600">Status</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[95, 100]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'SpO2']}
                />
                <Line 
                  type="monotone" 
                  dataKey="spo2" 
                  stroke="#0891b2" 
                  strokeWidth={3}
                  dot={{ fill: '#0891b2', r: 4 }}
                  activeDot={{ r: 6, fill: '#0891b2' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-700 mb-2">SpO2 Reference Ranges</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-600">Normal: </span>
                <span className="text-gray-600">95-100%</span>
              </div>
              <div>
                <span className="font-medium text-yellow-600">Concerning: </span>
                <span className="text-gray-600">90-94%</span>
              </div>
              <div>
                <span className="font-medium text-red-600">Critical: </span>
                <span className="text-gray-600">&lt;90%</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};