type ResAds = {
  width: string,
  height: string,
}

function Ads({ width, height }: ResAds){
      return (
        <div className="bg-gray-300 flex justify-center" style={{width:`${width}px`, height: `${height}px`}}>
          Publicidade
        </div>
      );
}

export default Ads