export interface Beacon {
  beaconNumber: string;
  cardinalDirection: string;
  longitude: number | null;
  latitude: number | null;
  beaconPillarProperlyErected: boolean | null;
  beaconIndex: number | null;
  beaconErectionStatus: string;
  verifiedDistance: number | null;
  verifiedBearing: number | null;
  verifiedNorthings: number | null;
  verifiedEastings: number | null;
  beaconNumberTo: string;
  verifiedBearingDegree: number | null;
  verifiedBearingMinute: number | null;
  verifiedBearingSeconds: number | null;
}

export interface ILandInvestigationDetails {
  surveyPlanNumber: string;
  landExistence: boolean | null;
  verifiedLandSize: number | null;
  landSizeConformity: boolean | null;
  numberOfBeacons: number | null;
  longitude: number | null;
  latitude: number | null;
  beacons: Beacon[];
  beaconIndex: number | null;
  investigationRemark: string;
  investigatedBy: string;
}

export interface IFiStatusDTO {
  surveyPlanNumber: string;
  status: string;
  investigatedOn: string;
  selectedInvestigationDateScheduleId: string;
  userId: string;
}
