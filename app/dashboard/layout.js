import Navbar from "@/components/navbar/Navbar";
export default function DashboarLayout({ children }) {
  return ( 
      <div
        
      >
        <Navbar />
        {children}
      </div> 
  );
}
