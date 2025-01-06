type StaffStatusType = {
  value: number;
  label: string;
  color: "secondary" | "success" | "destructive";
};

export const staffStatus: StaffStatusType[] = [
  {
    value: 0,
    label: "Inactive",
    color: "secondary",
  },
  {
    value: 1,
    label: "Active",
    color: "success",
  },
];

export const staffActionStatus: StaffStatusType[] = [
  {
    value: 0,
    label: "Inactive",
    color: "destructive",
  },
  {
    value: 1,
    label: "Active",
    color: "success",
  },
];
