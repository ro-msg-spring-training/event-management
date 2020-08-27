import { SublocationType } from "./SublocationType";
import { ProgramType } from "./ProgramType";

export interface LocationType {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  sublocations: SublocationType[];
  program: ProgramType[];
}
