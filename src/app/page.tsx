// import Image from "next/image";
// import { getLeagueInfo } from "./lib/actions";
// import Link from "next/link";

import Simulator from "@/components/Simulator";
import { getAllMatchesByLeagueSeason, getCurrentSeason, getLeagueStandingBySeason } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";
import { LeagueInfoType } from "../lib/types/leagueType";
import { useSearchParams } from "next/navigation";


// export default async function Home() {
 
// Replace these with the actual league IDs

//   const favoriteLeagueData = await Promise.all(
//     favoriteLeagues.map(async (league) => {
//       const leagueData = await getLeagueInfo(league.id);
//       return leagueData;
//     })
//   );
//   console.log(favoriteLeagueData);
//   return (

//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//     {favoriteLeagueData.map((leagueData) => {
//       if (!leagueData.response || leagueData.response.length === 0) {
//         return <div className=' '>
//         NO DATA
//         </div>;
//       } else {

//         const data = leagueData.response[0]

//         // console.log(leagueData);
//         return (
//           <div key={data.league.id} className="flex flex-col items-center">
//             <LeagueCard
//               link={`/leagues?league=${data.league.id}`}
//               name={data.league.name}
//               logo={data.league.logo}
//             />
//           </div>
//         );
//       }
//     })}
//     </main>
//   );
// }

type LeagueCardProps = {
  cardProps: LeagueInfoType;
  season: string;
};

function LeagueCard({ cardProps, season }: LeagueCardProps) {
  const { name, logo, id } = cardProps;
  return (
    <div className="flex flex-col items-center">
      <a
        href={`?league=${id}`}
        target="_self"

      >
      <h1 className="text-2xl font-bold">{name}</h1>
      <Image
        src={logo}
        alt={name}
        width={100}
        height={100}
      />
        </a>
    </div>
  );
}


// const mockMatchData: FixtureItem[] = [
//   {
//     "fixture": {
//       "id": 1180355,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 244,
//         "name": "Estádio José Pinheiro Borda",
//         "city": "Porto Alegre, Rio Grande do Sul"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 119,
//         "name": "Internacional",
//         "logo": "https://media.api-sports.io/football/teams/119.png",
//         "winner": null
//       },
//       "away": {
//         "id": 118,
//         "name": "Bahia",
//         "logo": "https://media.api-sports.io/football/teams/118.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180356,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 234,
//         "name": "Estádio Governador Magalhães Pinto",
//         "city": "Belo Horizonte, Minas Gerais"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 135,
//         "name": "Cruzeiro",
//         "logo": "https://media.api-sports.io/football/teams/135.png",
//         "winner": null
//       },
//       "away": {
//         "id": 120,
//         "name": "Botafogo",
//         "logo": "https://media.api-sports.io/football/teams/120.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180357,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 281,
//         "name": "Estádio Manoel Barradas",
//         "city": "Salvador, Bahia"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 136,
//         "name": "Vitoria",
//         "logo": "https://media.api-sports.io/football/teams/136.png",
//         "winner": null
//       },
//       "away": {
//         "id": 121,
//         "name": "Palmeiras",
//         "logo": "https://media.api-sports.io/football/teams/121.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180358,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": null,
//         "name": "Estadio Jornalista Mário Filho",
//         "city": "Rio de Janeiro, Rio de Janeiro"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 124,
//         "name": "Fluminense",
//         "logo": "https://media.api-sports.io/football/teams/124.png",
//         "winner": null
//       },
//       "away": {
//         "id": 794,
//         "name": "RB Bragantino",
//         "logo": "https://media.api-sports.io/football/teams/794.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180359,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 19377,
//         "name": "Estádio São Januário",
//         "city": "Rio de Janeiro, Rio de Janeiro"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 133,
//         "name": "Vasco DA Gama",
//         "logo": "https://media.api-sports.io/football/teams/133.png",
//         "winner": null
//       },
//       "away": {
//         "id": 130,
//         "name": "Gremio",
//         "logo": "https://media.api-sports.io/football/teams/130.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180360,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 11531,
//         "name": "Neo Química Arena",
//         "city": "São Paulo, São Paulo"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 131,
//         "name": "Corinthians",
//         "logo": "https://media.api-sports.io/football/teams/131.png",
//         "winner": null
//       },
//       "away": {
//         "id": 1062,
//         "name": "Atletico-MG",
//         "logo": "https://media.api-sports.io/football/teams/1062.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180361,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": null,
//         "name": "Estádio Cícero Pompeu de Toledo",
//         "city": "São Paulo, São Paulo"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 126,
//         "name": "Sao Paulo",
//         "logo": "https://media.api-sports.io/football/teams/126.png",
//         "winner": null
//       },
//       "away": {
//         "id": 154,
//         "name": "Fortaleza EC",
//         "logo": "https://media.api-sports.io/football/teams/154.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180362,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": null,
//         "name": "Ligga Arena",
//         "city": "Curitiba, Paraná"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 134,
//         "name": "Atletico Paranaense",
//         "logo": "https://media.api-sports.io/football/teams/134.png",
//         "winner": null
//       },
//       "away": {
//         "id": 1193,
//         "name": "Cuiaba",
//         "logo": "https://media.api-sports.io/football/teams/1193.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180363,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 211,
//         "name": "Estádio Antônio Accioly",
//         "city": "Goiânia, Goiás"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 144,
//         "name": "Atletico Goianiense",
//         "logo": "https://media.api-sports.io/football/teams/144.png",
//         "winner": null
//       },
//       "away": {
//         "id": 127,
//         "name": "Flamengo",
//         "logo": "https://media.api-sports.io/football/teams/127.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   {
//     "fixture": {
//       "id": 1180364,
//       "referee": null,
//       "timezone": "UTC",
//       "date": "2024-04-13T00:00:00+00:00",
//       "timestamp": 1712966400,
//       "periods": {
//         "first": null,
//         "second": null
//       },
//       "venue": {
//         "id": 233,
//         "name": "Estádio Heriberto Hülse",
//         "city": "Criciúma, Santa Catarina"
//       },
//       "status": {
//         "long": "Time to be defined",
//         "short": "TBD",
//         "elapsed": null
//       }
//     },
//     "league": {
//       "id": 71,
//       "name": "Serie A",
//       "country": "Brazil",
//       "logo": "https://media.api-sports.io/football/leagues/71.png",
//       "flag": "https://media.api-sports.io/flags/br.svg",
//       "season": 2024,
//       "round": "Regular Season - 1"
//     },
//     "teams": {
//       "home": {
//         "id": 140,
//         "name": "Criciuma",
//         "logo": "https://media.api-sports.io/football/teams/140.png",
//         "winner": null
//       },
//       "away": {
//         "id": 152,
//         "name": "Juventude",
//         "logo": "https://media.api-sports.io/football/teams/152.png",
//         "winner": null
//       }
//     },
//     "goals": {
//       "home": null,
//       "away": null
//     },
//     "score": {
//       "halftime": {
//         "home": null,
//         "away": null
//       },
//       "fulltime": {
//         "home": null,
//         "away": null
//       },
//       "extratime": {
//         "home": null,
//         "away": null
//       },
//       "penalty": {
//         "home": null,
//         "away": null
//       }
//     }
//   },
//   // {
//   //   "fixture": {
//   //     "id": 1180365,
//   //     "referee": null,
//   //     "timezone": "UTC",
//   //     "date": "2024-04-17T00:00:00+00:00",
//   //     "timestamp": 1713312000,
//   //     "periods": {
//   //       "first": null,
//   //       "second": null
//   //     },
//   //     "venue": {
//   //       "id": 241,
//   //       "name": "Arena do Grêmio",
//   //       "city": "Porto Alegre, Rio Grande do Sul"
//   //     },
//   //     "status": {
//   //       "long": "Time to be defined",
//   //       "short": "TBD",
//   //       "elapsed": null
//   //     }
//   //   },
//   //   "league": {
//   //     "id": 71,
//   //     "name": "Serie A",
//   //     "country": "Brazil",
//   //     "logo": "https://media.api-sports.io/football/leagues/71.png",
//   //     "flag": "https://media.api-sports.io/flags/br.svg",
//   //     "season": 2024,
//   //     "round": "Regular Season - 2"
//   //   },
//   //   "teams": {
//   //     "home": {
//   //       "id": 130,
//   //       "name": "Gremio",
//   //       "logo": "https://media.api-sports.io/football/teams/130.png",
//   //       "winner": null
//   //     },
//   //     "away": {
//   //       "id": 134,
//   //       "name": "Atletico Paranaense",
//   //       "logo": "https://media.api-sports.io/football/teams/134.png",
//   //       "winner": null
//   //     }
//   //   },
//   //   "goals": {
//   //     "home": null,
//   //     "away": null
//   //   },
//   //   "score": {
//   //     "halftime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "fulltime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "extratime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "penalty": {
//   //       "home": null,
//   //       "away": null
//   //     }
//   //   }
//   // },
//   // {
//   //   "fixture": {
//   //     "id": 1180366,
//   //     "referee": null,
//   //     "timezone": "UTC",
//   //     "date": "2024-04-17T00:00:00+00:00",
//   //     "timestamp": 1713312000,
//   //     "periods": {
//   //       "first": null,
//   //       "second": null
//   //     },
//   //     "venue": {
//   //       "id": null,
//   //       "name": "Arena MRV",
//   //       "city": "Belo Horizonte, Minas Gerais"
//   //     },
//   //     "status": {
//   //       "long": "Time to be defined",
//   //       "short": "TBD",
//   //       "elapsed": null
//   //     }
//   //   },
//   //   "league": {
//   //     "id": 71,
//   //     "name": "Serie A",
//   //     "country": "Brazil",
//   //     "logo": "https://media.api-sports.io/football/leagues/71.png",
//   //     "flag": "https://media.api-sports.io/flags/br.svg",
//   //     "season": 2024,
//   //     "round": "Regular Season - 2"
//   //   },
//   //   "teams": {
//   //     "home": {
//   //       "id": 1062,
//   //       "name": "Atletico-MG",
//   //       "logo": "https://media.api-sports.io/football/teams/1062.png",
//   //       "winner": null
//   //     },
//   //     "away": {
//   //       "id": 140,
//   //       "name": "Criciuma",
//   //       "logo": "https://media.api-sports.io/football/teams/140.png",
//   //       "winner": null
//   //     }
//   //   },
//   //   "goals": {
//   //     "home": null,
//   //     "away": null
//   //   },
//   //   "score": {
//   //     "halftime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "fulltime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "extratime": {
//   //       "home": null,
//   //       "away": null
//   //     },
//   //     "penalty": {
//   //       "home": null,
//   //       "away": null
//   //     }
//   //   }
//   // }
// ];

// const mockStandingData: StandingsType[] = [
//   {
//     "rank": 1,
//     "team": {
//       "id": 134,
//       "name": "Atletico Paranaense",
//       "logo": "https://media.api-sports.io/football/teams/134.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 2,
//     "team": {
//       "id": 144,
//       "name": "Atletico Goianiense",
//       "logo": "https://media.api-sports.io/football/teams/144.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 3,
//     "team": {
//       "id": 1062,
//       "name": "Atletico-MG",
//       "logo": "https://media.api-sports.io/football/teams/1062.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 4,
//     "team": {
//       "id": 118,
//       "name": "Bahia",
//       "logo": "https://media.api-sports.io/football/teams/118.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 5,
//     "team": {
//       "id": 120,
//       "name": "Botafogo",
//       "logo": "https://media.api-sports.io/football/teams/120.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores Qualifiers",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 6,
//     "team": {
//       "id": 131,
//       "name": "Corinthians",
//       "logo": "https://media.api-sports.io/football/teams/131.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Libertadores Qualifiers",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 7,
//     "team": {
//       "id": 140,
//       "name": "Criciuma",
//       "logo": "https://media.api-sports.io/football/teams/140.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 8,
//     "team": {
//       "id": 135,
//       "name": "Cruzeiro",
//       "logo": "https://media.api-sports.io/football/teams/135.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 9,
//     "team": {
//       "id": 1193,
//       "name": "Cuiaba",
//       "logo": "https://media.api-sports.io/football/teams/1193.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 10,
//     "team": {
//       "id": 127,
//       "name": "Flamengo",
//       "logo": "https://media.api-sports.io/football/teams/127.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 11,
//     "team": {
//       "id": 124,
//       "name": "Fluminense",
//       "logo": "https://media.api-sports.io/football/teams/124.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 12,
//     "team": {
//       "id": 154,
//       "name": "Fortaleza EC",
//       "logo": "https://media.api-sports.io/football/teams/154.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 13,
//     "team": {
//       "id": 130,
//       "name": "Gremio",
//       "logo": "https://media.api-sports.io/football/teams/130.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana Group Stage",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 14,
//     "team": {
//       "id": 119,
//       "name": "Internacional",
//       "logo": "https://media.api-sports.io/football/teams/119.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "CONMEBOL Sudamericana Group Stage",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 15,
//     "team": {
//       "id": 152,
//       "name": "Juventude",
//       "logo": "https://media.api-sports.io/football/teams/152.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": null,
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 16,
//     "team": {
//       "id": 121,
//       "name": "Palmeiras",
//       "logo": "https://media.api-sports.io/football/teams/121.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": null,
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 17,
//     "team": {
//       "id": 794,
//       "name": "RB Bragantino",
//       "logo": "https://media.api-sports.io/football/teams/794.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "Relegation",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 18,
//     "team": {
//       "id": 126,
//       "name": "Sao Paulo",
//       "logo": "https://media.api-sports.io/football/teams/126.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "Relegation",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 19,
//     "team": {
//       "id": 133,
//       "name": "Vasco DA Gama",
//       "logo": "https://media.api-sports.io/football/teams/133.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "Relegation",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   },
//   {
//     "rank": 20,
//     "team": {
//       "id": 136,
//       "name": "Vitoria",
//       "logo": "https://media.api-sports.io/football/teams/136.png"
//     },
//     "points": 0,
//     "goalsDiff": 0,
//     "group": "Serie A",
//     "form": null,
//     "status": "same",
//     "description": "Relegation",
//     "all": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "home": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "away": {
//       "played": 0,
//       "win": 0,
//       "draw": 0,
//       "lose": 0,
//       "goals": {
//         "for": 0,
//         "against": 0
//       }
//     },
//     "update": "2024-03-02T00:00:00+00:00"
//   }
// ]
export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
    searchParams?: { [league: string]: string | string[] | undefined };
}) {

    const favoriteLeagues = [
      {
        "id": 71,
      },
      {
        "id": 39,
      },

    ];
  if (!searchParams || !searchParams.league) {
    return <div>No chosen League...</div>
  }
  const league = searchParams.league as string
  const leagueId = league
  const leagueData = await getCurrentSeason(leagueId)

  console.log(`league -->\n`, leagueData)

  if (!leagueData || !leagueData.response || !Array.isArray(leagueData.response)) {
    return <div>Loading...</div>
  }

  const currentSeason = leagueData.response[0].seasons[0].year
  


  return (
    <main>
      <div className='flex flex-col sm:flex sm:flex-row w-full gap-4 items-center '>
        {favoriteLeagues.map((league) => {
          return <League id={`${league.id}`} />
        }
        )}
      </div>
      <SimulatorFeed
        leagueId={leagueId}
        currentSeason={`${currentSeason}`}
      />
      {/* <LeagueStandings 
        standingsData={rankingTableData}
      />
      <LeagueMatches 
        matchData={allMatchesData}
      /> */}
    </main>
  );
}

async function SimulatorFeed({leagueId, currentSeason}:{leagueId: string, currentSeason: string}) {
  // const searchParams = useSearchParams()
  // const leagueId = searchParams.get("league") as string
  // const currentSeason = searchParams.get("season")

  const rankingTable = await getLeagueStandingBySeason(leagueId, `${currentSeason}`)
  const allMatches = await getAllMatchesByLeagueSeason(leagueId, `${currentSeason}`)

  if (!rankingTable || !rankingTable.response || !allMatches || !allMatches.response) {
    return <div>Loading...</div>
  }


  if (!rankingTable.response || !Array.isArray(rankingTable.response[0]?.league.standings[0])) {
    return <div>NO AVAILABLE DATA...</div>
  }


  console.log(`standings -->\n`, rankingTable.response[0].league.standings[0])
  
  const rankingTableData = rankingTable.response[0].league.standings[0]

  if (!Array.isArray(rankingTableData)) {
    return <div>Loading...</div>
  }

  const allMatchesData = allMatches.response

  const data = {
    matchData: allMatchesData,
    standingsData: rankingTableData
  }

  return ( 
    <>
      <Simulator
        simulatorData={data}
      />
        </>
  )
}
async function League({id}: {id:string}) {
  const league = await getCurrentSeason(id)

  console.log(`league -->\n`, league)

  if (!league || !league.response || !Array.isArray(league.response)) {
    return <div>Loading...</div>
  }

  const currentSeason = league.response[0].seasons[0].year
  const leagueData = league.response[0].league


  return (
    <div>
      <LeagueCard 
        cardProps={leagueData}
        season={`${currentSeason}`}
      />
    </div>
  );

}