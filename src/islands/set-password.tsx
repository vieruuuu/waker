import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { actions } from "astro:actions";

export function SetPassword() {
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await actions.login(password);

          location.reload();
        }}
      >
        <Card className="mx-auto max-w-md w-full">
          <CardHeader>
            <CardTitle>Credentials</CardTitle>
          </CardHeader>

          <CardContent>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
