import DragDrop from "@/components/dragdrop/DragDrop";
export default async function Home() {
  return (
    <>
      
      <DragDrop />
      <div className="absolute top-20 left-80 bg-green-500 blur-[100px] w-80 h-80 -z-10"></div>
      <div className="absolute top-60 right-60 bg-red-500 blur-3xl w-80 h-80 -z-10"></div>
    </>
  );
}
