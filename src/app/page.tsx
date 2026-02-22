//главная страница сайта, когда пользователдь заходит - т.е. это точка входа  
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}