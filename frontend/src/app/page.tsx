import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <div className=" pr-2 flex bg-slate-50 justify-end items-center h-screen">
        <Card className="w-[1550px] h-[850px] grid grid-rows-[min-content_1fr_min-content]">
          <CardHeader>
            <CardTitle>Hello World</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 text-slate-600 text">
              <Avatar>
                <AvatarFallback>USR</AvatarFallback>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <span className="block font-bold text-slate-700">Usuário</span>
                <p className="leading-relaxed"> qual sua opniao sobre java</p>
              </div>
            </div>
            <div>
              <Avatar>
                <AvatarFallback>USR</AvatarFallback>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
          </CardContent>
          <CardFooter className="space-x-2">
            <Input placeholder="como posso te ajudar"></Input>
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
