
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
      title: "سایت",
      type: "collapse",
      icon: HomeOutlinedIcon,
      children:[
       {
        title:"دیدن سایت",
        type:"item",
        url:"/"
       }
      ]
    },
    {
      title: "ارزها",
      type: "item",
      icon: DashboardOutlinedIcon,
      url:"rates"
    },
    {
      title: "مشتریان",
      type: "item",
      icon: SupervisorAccountOutlinedIcon,
      url:"customers"
    }
  ]
};
export default common;
