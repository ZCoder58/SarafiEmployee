import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
const common = {
  title: "عمومی",
  type: "group",
  children: [
    {
      title: "داشبورد",
      type: "item",
      icon: DashboardOutlinedIcon,
      url:"dashboard"
    },
    {
      title: "ارز ها",
      type: "item",
      icon: MonetizationOnOutlinedIcon,
      url:"rates"
    },
    {
      title:"کارمندان",
      type:"collapse",
      icon:SupervisorAccountOutlinedIcon,
      children:[
        {
          title:"کارمند جدید",
          type:"item",
          url:"employees/newEmployee"
        },
        {
          title:"لیست کارمندان",
          type:"item",
          url:"employees"
        }
      ]
    },
    {
      title:"حواله ها",
      type:"collapse",
      icon:SyncAltOutlinedIcon,
      children:[
        {
          title:"حواله جدید",
          type:"item",
          url:"transfers/newTransfer"
        },
        {
          title:"لیست حواله ها",
          type:"item",
          url:"transfers"
        }
      ]
    },
    {
      title: "روزنامچه",
      type: "item",
      icon: CalendarTodayOutlinedIcon,
      url:"report"
    },
    {
      title: "مشتریان داعمی",
      type: "item",
      icon: BadgeOutlinedIcon,
      url:"subCustomers"
    },
  ]
};
export default common;
