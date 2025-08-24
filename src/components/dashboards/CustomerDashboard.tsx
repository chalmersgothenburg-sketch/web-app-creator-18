import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Heart, Activity, Battery, Shield, FileText, BarChart3, Droplets, Activity as Pulse, Moon, Zap, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { EmergencyMonitor } from "@/components/EmergencyMonitor";
import { PrescriptionUpload } from "@/components/PrescriptionUpload";
import { InsuranceUpload } from "@/components/InsuranceUpload";
import { ChatBox } from "@/components/ChatBox";
import { StepsDetailModal } from "@/components/StepsDetailModal";
import { HeartRateDetailModal } from "@/components/HeartRateDetailModal";
import { CaloriesDetailModal } from "@/components/CaloriesDetailModal";
import { BPDetailModal } from "@/components/BPDetailModal";
import { SPO2DetailModal } from "@/components/SPO2DetailModal";
import { MapCard } from "@/components/MapCard";

const healthData = [
  { time: "6:00", heartRate: 68, bloodPressure: 120, steps: 0 },
  { time: "9:00", heartRate: 72, bloodPressure: 118, steps: 2500 },
  { time: "12:00", heartRate: 78, bloodPressure: 125, steps: 5200 },
  { time: "15:00", heartRate: 75, bloodPressure: 122, steps: 7800 },
  { time: "18:00", heartRate: 70, bloodPressure: 119, steps: 9200 },
  { time: "21:00", heartRate: 65, bloodPressure: 115, steps: 10500 },
];

const medicationSchedule = [
  { name: "Lisinopril", time: "8:00 AM", dosage: "10mg", status: "taken" },
  { name: "Metformin", time: "12:00 PM", dosage: "500mg", status: "taken" },
  { name: "Aspirin", time: "6:00 PM", dosage: "81mg", status: "pending" },
  { name: "Vitamin D", time: "8:00 PM", dosage: "1000 IU", status: "pending" },
];

const recentActivities = [
  { activity: "Morning walk", duration: "30 min", time: "7:30 AM", calories: 150 },
  { activity: "Light exercise", duration: "15 min", time: "10:00 AM", calories: 80 },
  { activity: "Garden work", duration: "45 min", time: "4:00 PM", calories: 200 },
];

const weeklyActivity = [
  { day: "M", active: true },
  { day: "T", active: false },
  { day: "W", active: true },
  { day: "T", active: true },
  { day: "F", active: false },
  { day: "S", active: true },
  { day: "S", active: true },
];

const calorieData = [
  { day: "Mon", calories: 1850 },
  { day: "Tue", calories: 1920 },
  { day: "Wed", calories: 1780 },
  { day: "Thu", calories: 1931 },
  { day: "Fri", calories: 2100 },
  { day: "Sat", calories: 1650 },
  { day: "Sun", calories: 1890 },
];

// New data for BP, SPO2, Sleep and Activity
const bpData = [
  { time: "6:00", systolic: 118, diastolic: 78 },
  { time: "9:00", systolic: 122, diastolic: 80 },
  { time: "12:00", systolic: 125, diastolic: 82 },
  { time: "15:00", systolic: 120, diastolic: 79 },
  { time: "18:00", systolic: 115, diastolic: 75 },
  { time: "21:00", systolic: 112, diastolic: 72 },
];

const spo2Data = [
  { time: "6:00", spo2: 98 },
  { time: "9:00", spo2: 97 },
  { time: "12:00", spo2: 99 },
  { time: "15:00", spo2: 98 },
  { time: "18:00", spo2: 99 },
  { time: "21:00", spo2: 98 },
];

const sleepData = [
  { time: "22:00", stage: "awake", duration: 15 },
  { time: "22:30", stage: "light", duration: 90 },
  { time: "24:00", stage: "deep", duration: 60 },
  { time: "02:00", stage: "rem", duration: 45 },
  { time: "04:00", stage: "light", duration: 75 },
  { time: "06:00", stage: "awake", duration: 10 },
];

const activityData = [
  { time: "6:00", level: "idle" },
  { time: "7:00", level: "active" },
  { time: "8:00", level: "very_active" },
  { time: "9:00", level: "active" },
  { time: "10:00", level: "idle" },
  { time: "11:00", level: "idle" },
  { time: "12:00", level: "active" },
  { time: "13:00", level: "idle" },
  { time: "14:00", level: "active" },
  { time: "15:00", level: "very_active" },
  { time: "16:00", level: "very_active" },
  { time: "17:00", level: "active" },
  { time: "18:00", level: "idle" },
  { time: "19:00", level: "idle" },
  { time: "20:00", level: "active" },
  { time: "21:00", level: "idle" },
];

const activityDistribution = [
  { name: "Very Active", value: 25, color: "#ef4444" },
  { name: "Active", value: 35, color: "#f97316" },
  { name: "Idle", value: 40, color: "#6b7280" },
];

export const CustomerDashboard = () => {
  const { toast } = useToast();
  const [reportRequest, setReportRequest] = useState("");
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [showHeartRateModal, setShowHeartRateModal] = useState(false);
  const [showCaloriesModal, setShowCaloriesModal] = useState(false);
  const [showBPModal, setShowBPModal] = useState(false);
  const [showSPO2Modal, setShowSPO2Modal] = useState(false);
  const [bpTimeRange, setBpTimeRange] = useState("7days");
  const [spo2TimeRange, setSpo2TimeRange] = useState("7days");

  const handleReportSubmit = () => {
    if (!reportRequest.trim()) {
      toast({
        title: "Please enter your report request",
        description: "Add details about what you'd like in your medical report.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Request Submitted",
      description: "Your medical report will be generated by AI and verified by a medical doctor. It will be uploaded to your dashboard within 48 hours.",
    });

    setReportRequest("");
  };

  return (
    <div className="h-screen overflow-y-auto space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Health Dashboard</h1>
        <Badge variant="secondary">Customer Portal</Badge>
      </div>

      {/* Emergency Monitor - Always at top for customers */}
      <EmergencyMonitor />

      {/* Health Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-10 w-10 text-red-500" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHeartRateModal(true)}
                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm text-red-600/70 font-medium">Heart Rate</p>
              <p className="text-3xl font-bold text-red-700 mb-1">72</p>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">Normal Range</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-rose-400"></div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="h-10 w-10 text-purple-600" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBPModal(true)}
                className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm text-purple-600/70 font-medium">Blood Pressure</p>
              <p className="text-3xl font-bold text-purple-700 mb-1">120/80</p>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">Optimal</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-violet-400"></div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200 hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Pulse className="h-10 w-10 text-cyan-600" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSPO2Modal(true)}
                className="h-8 w-8 p-0 hover:bg-cyan-100 text-cyan-600"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm text-cyan-600/70 font-medium">SpO2</p>
              <p className="text-3xl font-bold text-cyan-700 mb-1">98%</p>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">Excellent</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Moon className="h-10 w-10 text-indigo-600" />
              <div className="text-right">
                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">8h 15m</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-indigo-600/70 font-medium">Sleep</p>
              <p className="text-3xl font-bold text-indigo-700 mb-1">85%</p>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">Good Quality</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-10 w-10 text-orange-600" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStepsModal(true)}
                className="h-8 w-8 p-0 hover:bg-orange-100 text-orange-600"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm text-orange-600/70 font-medium">Daily Steps</p>
              <p className="text-3xl font-bold text-orange-700 mb-1">10,500</p>
              <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full inline-block">Goal Achieved! 🎉</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-400"></div>
        </Card>
      </div>

      {/* Sleep Analysis and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sleep Analysis */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200">
          <div className="flex items-center mb-6">
            <Moon className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-indigo-700">Sleep Analysis</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-700">8h 15m</p>
              <p className="text-sm text-indigo-600">Total Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">2h 30m</p>
              <p className="text-sm text-purple-600">Deep Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">1h 45m</p>
              <p className="text-sm text-blue-600">REM Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-700">4h 20m</p>
              <p className="text-sm text-cyan-600">Light Sleep</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-indigo-600">10:00 PM</span>
              <span className="text-sm text-indigo-600">6:00 AM</span>
            </div>
            <div className="h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-2 relative overflow-hidden">
              <div className="flex h-full">
                <div className="bg-gray-400 w-[5%] rounded-l-md flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Awake</span>
                </div>
                <div className="bg-blue-300 w-[25%] flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Light</span>
                </div>
                <div className="bg-indigo-600 w-[20%] flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Deep</span>
                </div>
                <div className="bg-purple-600 w-[15%] flex items-center justify-center">
                  <span className="text-xs text-white font-medium">REM</span>
                </div>
                <div className="bg-blue-300 w-[25%] flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Light</span>
                </div>
                <div className="bg-gray-400 w-[10%] rounded-r-md flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Awake</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded mr-2"></div>
                <span className="text-xs text-gray-600">Awake</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-300 rounded mr-2"></div>
                <span className="text-xs text-blue-600">Light Sleep</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded mr-2"></div>
                <span className="text-xs text-indigo-600">Deep Sleep</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
                <span className="text-xs text-purple-600">REM Sleep</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Map Card */}
        <MapCard className="lg:col-span-1" />
      </div>

     {/* Daily Activity Analysis */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-orange-700 flex items-center">
            <Zap className="h-6 w-6 mr-3" />
            Today's Activity Levels
          </h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-700">6,543</p>
            <p className="text-sm text-orange-600">Total Activity Points</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Timeline */}
          <div className="lg:col-span-2">
            <h4 className="text-md font-medium text-orange-700 mb-4">Activity Timeline</h4>
            <ResponsiveContainer width="100%" height={300}>
               <BarChart data={activityData.map(item => ({
                ...item,
                levelValue: item.level === 'idle' ? 0 : item.level === 'active' ? 1 : 2
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.replace(':00', '')}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 2]}
                  tickFormatter={(value) => {
                    if (value === 0) return 'Idle';
                    if (value === 1) return 'Active';
                    if (value === 2) return 'Very Active';
                    return '';
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => {
                    const levels = ['Idle', 'Active', 'Very Active'];
                    return [levels[value as number] || '', 'Activity Level'];
                  }}
                />
                <Bar 
                  dataKey="levelValue"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Activity Distribution */}
          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium text-orange-700 mb-4">Activity Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={activityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {activityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Time']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {activityDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      

      {/* Report Generation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Generate Medical Report
        </h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Describe what you'd like included in your medical report (e.g., recent symptoms, medication review, health summary)..."
            value={reportRequest}
            onChange={(e) => setReportRequest(e.target.value)}
            rows={4}
          />
          <Button onClick={handleReportSubmit} className="w-full">
            Submit Report Request
          </Button>
        </div>
      </Card>

      
      {/* Emergency Contacts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium text-foreground">Primary Contact</p>
            <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
            <p className="text-sm text-foreground">(555) 123-4567</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium text-foreground">Emergency Services</p>
            <p className="text-sm text-muted-foreground">Local Emergency</p>
            <p className="text-sm text-foreground">911</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium text-foreground">Family Contact</p>
            <p className="text-sm text-muted-foreground">John Smith (Son)</p>
            <p className="text-sm text-foreground">(555) 987-6543</p>
          </div>
        </div>
      </Card>

      {/* Steps Detail Modal */}
      <StepsDetailModal isOpen={showStepsModal} onClose={() => setShowStepsModal(false)} />
      
      {/* Heart Rate Detail Modal */}
      <HeartRateDetailModal isOpen={showHeartRateModal} onClose={() => setShowHeartRateModal(false)} />
      
      {/* Calories Detail Modal */}
      <CaloriesDetailModal isOpen={showCaloriesModal} onClose={() => setShowCaloriesModal(false)} />

      {/* BP Detail Modal */}
      <BPDetailModal 
        open={showBPModal} 
        onOpenChange={setShowBPModal}
        timeRange={bpTimeRange}
        onTimeRangeChange={setBpTimeRange}
      />

      {/* SPO2 Detail Modal */}
      <SPO2DetailModal 
        open={showSPO2Modal} 
        onOpenChange={setShowSPO2Modal}
        timeRange={spo2TimeRange}
        onTimeRangeChange={setSpo2TimeRange}
      />

      {/* AI Chatbox */}
      <ChatBox />
    </div>
  );
};