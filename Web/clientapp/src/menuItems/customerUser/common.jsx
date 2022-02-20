import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';

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
  ]
};
export default common;
