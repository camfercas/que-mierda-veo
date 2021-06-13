import { Option } from "./Option";

export const Options = () => {
  return (
    <>
      <div className="flex flex-wrap overflow-hidden place-content-center place-items-center mt-5">
        <Option
          url="by-genres"
          path="options"
          desc="Buscar por género"
        ></Option>
        <Option url="latest" path="options" desc="Últimos estrenos"></Option>
        <Option
          url="by-other-movies"
          path="options"
          desc="Buscar por otras películas que ví"
        ></Option>
      </div>
      <p className="text-white text-xl font-bold">Qué mierd* veo en?</p>
      <div className="flex flex-wrap overflow-hidden place-content-center place-items-center mt-5">
        <Option url="provider/netflix" path="" desc="Netflix"></Option>
        <Option url="provider/disney" path="" desc="Disney +"></Option>
        <Option url="provider/prime" path="" desc="Amazon Prime"></Option>
      </div>
    </>
  );
};
