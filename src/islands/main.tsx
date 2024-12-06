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
import { actions } from "astro:actions";

export function Main({ state }: { state: boolean }) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>

        <CardContent>{state ? "Pornit" : "Oprit"}</CardContent>

        <CardFooter className="grid grid-cols-2 gap-4">
          <Button
            onClick={async () => {
              await actions.setState(true);
              location.reload();
            }}
            className="bg-green-500 hover:bg-green-700"
          >
            ON
          </Button>

          <Button
            onClick={async () => {
              await actions.setState(false);
              location.reload();
            }}
            className="bg-red-500 hover:bg-red-700"
          >
            OFF
          </Button>

          <Button
            onClick={async () => {
              await actions.logout();
              location.reload();
            }}
          >
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
