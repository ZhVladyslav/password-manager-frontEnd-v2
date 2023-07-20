// get all collections res
export interface IGetAllCollectionsRes {
  id: string;
  name: string;
  star: boolean;
}

// get collection by id res
export interface IGetCollectionByIdRes {
  id: string;
  name: string;
  star: boolean;
  passwords: string;
}

// create collection req
export interface ICreateCollectionReq {
  name: string;
}

// edit info collection req
export interface IEditInfoCollection {
  passCollectionId: string;
  name: string;
  star: boolean;
}
