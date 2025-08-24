// Temporary mock components to prevent TypeScript errors until Supabase types are regenerated

export const TempEmergencyMonitor = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="text-red-700 font-medium">Emergency Monitor</h3>
      <p className="text-red-600 text-sm">All systems normal</p>
    </div>
  );
};

export const TempHealthCharts = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-blue-700 font-medium">Health Charts</h3>
      <p className="text-blue-600 text-sm">Loading health metrics...</p>
    </div>
  );
};

export const TempPrescriptionUpload = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-green-700 font-medium">Prescription Upload</h3>
      <p className="text-green-600 text-sm">Upload prescription files here</p>
    </div>
  );
};

export const TempInsuranceUpload = () => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 className="text-purple-700 font-medium">Insurance Upload</h3>
      <p className="text-purple-600 text-sm">Upload insurance documents here</p>
    </div>
  );
};