import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
    {
      title: "مشتریان داعمی",
      type: "item",
      icon: BadgeOutlinedIcon,
      url:"subCustomers"
    },
    {
      title: "حسابات من",
      type: "item",
      icon: AccountBalanceWalletOutlinedIcon,
      url:"accounts"
    },
    {
      title:"بیلانس ها",
      type:"collapse",
      icon:DescriptionOutlinedIcon,
      children:[
        {
          title:"بیلانس حواله ها",
          type:"item",
          url:"transfers/bills"
        },
        {
          title:"بیلانس رسید و برد مشتریان",
          type:"item",
          url:"subCustomers/bills"
        }
      ]
    },
  ]
};
export default common;
