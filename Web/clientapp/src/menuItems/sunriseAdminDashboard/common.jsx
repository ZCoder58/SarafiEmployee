
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

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
  ]
};
export default common;
