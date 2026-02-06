
import { Qahiri } from "next/font/google";
import { hostname } from "os";
import { getData } from "@/essentials"
import { SearchBar } from "@/components/Primal/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
  const q = searchParams["q"] ?? ""; 
  
  const results = await getData(`http://localhost:8080/api/search`, {q: q}, "POST").then(res => res.results);

  return (
    <div className="bg-grayy  mt-0 absolute w-full">
      <SearchBar value={q} className="flex rounded-md bg-lightgrayy justify-center items-center border-lightgrayy border-4 w-2/5 mt-2 ml-32 h-12" />
    
         {
          
          results.map((result: any) => {
            return (
              <div className="mt-8 ml-32">
                
                <div className="flex"> 
                  <img src={result.icon} className="h-10"/>
                  <div className="ml-3">
                    <a href={result.url}>
                    <p className="text-base hover:underline-offset-4 hover:underline text-white">{result.title}</p>
                    </a>
                    <p className="text-sm text-gray-400">{result.url}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-wrap max-w-lg">{result.description}</p>
                
              </div>
            );
          })
        }
      
    </div>
  );
}
