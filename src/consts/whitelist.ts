import { TokenType, LpofLpType, LpStakingType, DexEnum } from 'types/network'

import USTLogo from 'images/whitelist/UST.png'
import MIAWLogo from 'images/whitelist/MIAW.png'
import LUNALogo from 'images/whitelist/LUNA.svg'
import bLUNALogo from 'images/whitelist/bLUNA.png'
import LOTALogo from 'images/whitelist/LOTA.png'
import bETHLogo from 'images/whitelist/bETH.png'
import ANCLogo from 'images/whitelist/ANC.png'
import MIRLogo from 'images/whitelist/MIR.svg'
import mAAPLLogo from 'images/whitelist/mAAPL.svg'
import mABNBLogo from 'images/whitelist/mABNB.png'
import mAMCLogo from 'images/whitelist/mAMC.svg'
import mAMDLogo from 'images/whitelist/mAMD.png'
import mAMZNLogo from 'images/whitelist/mAMZN.svg'
import mBABALogo from 'images/whitelist/mBABA.svg'
import mBTCLogo from 'images/whitelist/mBTC.png'
import mCOINLogo from 'images/whitelist/mCOIN.png'
import mDOTLogo from 'images/whitelist/mDOT.png'
import mETHLogo from 'images/whitelist/mETH.png'
import mFBLogo from 'images/whitelist/mFB.png'
import mGLXYLogo from 'images/whitelist/mGLXY.png'
import mGMELogo from 'images/whitelist/mGME.svg'
import mGOOGLLogo from 'images/whitelist/mGOOGL.svg'
import mGSLogo from 'images/whitelist/mGS.png'
import mIAULogo from 'images/whitelist/mIAU.svg'
import mMSFTLogo from 'images/whitelist/mMSFT.svg'
import mNFLXLogo from 'images/whitelist/mNFLX.svg'
import mQQQLogo from 'images/whitelist/mQQQ.svg'
import mSLVLogo from 'images/whitelist/mSLV.svg'
import mSPYLogo from 'images/whitelist/mSPY.svg'
import mSQLogo from 'images/whitelist/mSQ.png'
import mTSLALogo from 'images/whitelist/mTSLA.svg'
import mTWTRLogo from 'images/whitelist/mTWTR.svg'
import mUSOLogo from 'images/whitelist/mUSO.svg'
import mVIXYLogo from 'images/whitelist/mVIXY.svg'
import DPHLogo from 'images/whitelist/DPH.png'
import MINELogo from 'images/whitelist/MINE.png'
import SPECLogo from 'images/whitelist/SPEC.png'
import ALTELogo from 'images/whitelist/ALTE.png'
import TWDLogo from 'images/whitelist/TWD.png'
import STTLogo from 'images/whitelist/STT.png'
import VKRLogo from 'images/whitelist/VKR.png'
import PSILogo from 'images/whitelist/PSI.png'
import KUJILogo from 'images/whitelist/KUJI.png'
import WHALELogo from 'images/whitelist/WHALE.svg'
import APOLLOLogo from 'images/whitelist/APOLLO.png'
import LUNILogo from 'images/whitelist/LUNI.png'
import TLANDLogo from 'images/whitelist/TLAND.png'
import ORNELogo from 'images/whitelist/ORNE.png'
import PLYLogo from 'images/whitelist/PLY.png'
import tSHIBALogo from 'images/whitelist/tSHIBA.png'
import XTRALogo from 'images/whitelist/XTRA.png'
import aUSTLogo from 'images/whitelist/aUST.png'
import GLOWLogo from 'images/whitelist/GLOW.png'
import ATLOLogo from 'images/whitelist/ATLO.svg'
import LOCALLogo from 'images/whitelist/LOCAL.png'
import LUNAXLogo from 'images/whitelist/LUNAX.png'
import MARSLogo from 'images/whitelist/MARS.svg'
import PRISMLogo from 'images/whitelist/PRISM.png'
import xPRISMLogo from 'images/whitelist/xPRISM.png'
import ASTROLogo from 'images/whitelist/ASTRO.png'
import xASTROLogo from 'images/whitelist/xASTROLogo.png'

import {
  TokenKeyEnum,
  ContractAddr,
  TokenDenomEnum,
  TokenInfoType,
  TokenInfoGoupEnum,
} from 'types'

const tokenInfo: Record<TokenKeyEnum, TokenInfoType> = {
  [TokenKeyEnum.ATLO]: {
    symbol: 'ATLO',
    name: 'ATLO Token',
    logo: ATLOLogo,
    contractOrDenom:
      'terra1cl7whtrqmz5ldr553q69qahck8xvk80fm33qjx' as ContractAddr,
  },
  [TokenKeyEnum.GLOW]: {
    symbol: 'GLOW',
    name: 'GLOW Token',
    logo: GLOWLogo,
    contractOrDenom:
      'terra13zx49nk8wjavedjzu8xkk95r3t0ta43c9ptul7' as ContractAddr,
  },
  [TokenKeyEnum.XTRA]: {
    symbol: 'XTRA',
    name: 'XTRA Token',
    logo: XTRALogo,
    contractOrDenom:
      'terra1kvjscdgwuvwc6uzm4rqfjl6nlmuhj28tequlnc' as ContractAddr,
  },
  [TokenKeyEnum.aUST]: {
    symbol: 'aUST',
    name: 'aUST Token',
    logo: aUSTLogo,
    contractOrDenom:
      'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.MIAW]: {
    symbol: 'MIAW',
    name: 'MIAW Token',
    logo: MIAWLogo,
    contractOrDenom:
      'terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63' as ContractAddr,
  },
  [TokenKeyEnum.UST]: {
    symbol: 'UST',
    name: 'UST',
    logo: USTLogo,
    contractOrDenom: TokenDenomEnum.uusd,
  },
  [TokenKeyEnum.Luna]: {
    symbol: 'Luna',
    name: 'Luna',
    logo: LUNALogo,
    contractOrDenom: TokenDenomEnum.uluna,
  },
  [TokenKeyEnum.bLuna]: {
    symbol: 'bLuna',
    name: 'Anchor bLuna',
    logo: bLUNALogo,
    contractOrDenom:
      'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.TWD]: {
    symbol: 'TWD',
    name: 'Terra World Token',
    logo: TWDLogo,
    contractOrDenom:
      'terra19djkaepjjswucys4npd5ltaxgsntl7jf0xz7w6' as ContractAddr,
  },
  [TokenKeyEnum.STT]: {
    symbol: 'STT',
    name: 'StarTerra',
    logo: STTLogo,
    contractOrDenom:
      'terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n' as ContractAddr,
  },
  [TokenKeyEnum.LOTA]: {
    symbol: 'LOTA',
    name: 'loterra',
    logo: LOTALogo,
    contractOrDenom:
      'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr' as ContractAddr,
  },
  [TokenKeyEnum.bETH]: {
    symbol: 'bETH',
    name: 'Bonded ETH',
    logo: bETHLogo,
    contractOrDenom:
      'terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.ANC]: {
    symbol: 'ANC',
    name: 'Anchor Token',
    logo: ANCLogo,
    contractOrDenom:
      'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76' as ContractAddr,
    group: TokenInfoGoupEnum.anc,
  },
  [TokenKeyEnum.MIR]: {
    symbol: 'MIR',
    name: 'Mirror',
    logo: MIRLogo,
    contractOrDenom:
      'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAAPL]: {
    symbol: 'mAAPL',
    name: 'Apple Inc.',
    logo: mAAPLLogo,
    contractOrDenom:
      'terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mABNB]: {
    symbol: 'mABNB',
    name: 'Airbnb Inc.',
    logo: mABNBLogo,
    contractOrDenom:
      'terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMC]: {
    symbol: 'mAMC',
    name: 'AMC Entertainment Holdings Inc.',
    logo: mAMCLogo,
    contractOrDenom:
      'terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMD]: {
    symbol: 'mAMD',
    name: 'Advanced Micro Devices, Inc.',
    logo: mAMDLogo,
    contractOrDenom:
      'terra18ej5nsuu867fkx4tuy2aglpvqjrkcrjjslap3z' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mAMZN]: {
    symbol: 'mAMZN',
    name: 'Amazon.com, Inc.',
    logo: mAMZNLogo,
    contractOrDenom:
      'terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mBABA]: {
    symbol: 'mBABA',
    name: 'Alibaba Group Holding Limited',
    logo: mBABALogo,
    contractOrDenom:
      'terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mBTC]: {
    symbol: 'mBTC',
    name: 'Bitcoin',
    logo: mBTCLogo,
    contractOrDenom:
      'terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mCOIN]: {
    symbol: 'mCOIN',
    name: 'Coinbase Global, Inc.',
    logo: mCOINLogo,
    contractOrDenom:
      'terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mDOT]: {
    symbol: 'mDOT',
    name: 'Polkadot',
    logo: mDOTLogo,
    contractOrDenom:
      'terra19ya4jpvjvvtggepvmmj6ftmwly3p7way0tt08r' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mETH]: {
    symbol: 'mETH',
    name: 'Ether',
    logo: mETHLogo,
    contractOrDenom:
      'terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mFB]: {
    symbol: 'mFB',
    name: 'Facebook Inc.',
    logo: mFBLogo,
    contractOrDenom:
      'terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGLXY]: {
    symbol: 'mGLXY',
    name: 'Galaxy Digital Holdings Ltd',
    logo: mGLXYLogo,
    contractOrDenom:
      'terra1l5lrxtwd98ylfy09fn866au6dp76gu8ywnudls' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGME]: {
    symbol: 'mGME',
    name: 'GameStop Corp',
    logo: mGMELogo,
    contractOrDenom:
      'terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGOOGL]: {
    symbol: 'mGOOGL',
    name: 'Alphabet Inc.',
    logo: mGOOGLLogo,
    contractOrDenom:
      'terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mGS]: {
    symbol: 'mGS',
    name: 'Goldman Sachs Group Inc.',
    logo: mGSLogo,
    contractOrDenom:
      'terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mIAU]: {
    symbol: 'mIAU',
    name: 'iShares Gold Trust',
    logo: mIAULogo,
    contractOrDenom:
      'terra10h7ry7apm55h4ez502dqdv9gr53juu85nkd4aq' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mMSFT]: {
    symbol: 'mMSFT',
    name: 'Microsoft Corporation',
    logo: mMSFTLogo,
    contractOrDenom:
      'terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mNFLX]: {
    symbol: 'mNFLX',
    name: 'Netflix, Inc.',
    logo: mNFLXLogo,
    contractOrDenom:
      'terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mQQQ]: {
    symbol: 'mQQQ',
    name: 'Invesco QQQ Trust',
    logo: mQQQLogo,
    contractOrDenom:
      'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSLV]: {
    symbol: 'mSLV',
    name: 'iShares Silver Trust',
    logo: mSLVLogo,
    contractOrDenom:
      'terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSPY]: {
    symbol: 'mSPY',
    name: 'SPDR S&P 500',
    logo: mSPYLogo,
    contractOrDenom:
      'terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mSQ]: {
    symbol: 'mSQ',
    name: 'Square, Inc.',
    logo: mSQLogo,
    contractOrDenom:
      'terra1u43zu5amjlsgty5j64445fr9yglhm53m576ugh' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mTSLA]: {
    symbol: 'mTSLA',
    name: 'Tesla, Inc.',
    logo: mTSLALogo,
    contractOrDenom:
      'terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mTWTR]: {
    symbol: 'mTWTR',
    name: 'Twitter, Inc.',
    logo: mTWTRLogo,
    contractOrDenom:
      'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mUSO]: {
    symbol: 'mUSO',
    name: 'United States Oil Fund, LP',
    logo: mUSOLogo,
    contractOrDenom:
      'terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.mVIXY]: {
    symbol: 'mVIXY',
    name: 'ProShares VIX Short-Term Futures ETF',
    logo: mVIXYLogo,
    contractOrDenom:
      'terra19cmt6vzvhnnnfsmccaaxzy2uaj06zjktu6yzjx' as ContractAddr,
    group: TokenInfoGoupEnum.mirror,
  },
  [TokenKeyEnum.DPH]: {
    symbol: 'DPH',
    name: 'Digipharm',
    logo: DPHLogo,
    contractOrDenom:
      'terra17jnhankdfl8vyzj6vejt7ag8uz0cjc9crkl2h7' as ContractAddr,
  },
  [TokenKeyEnum.MINE]: {
    symbol: 'MINE',
    name: 'Pylon MINE Token',
    logo: MINELogo,
    contractOrDenom:
      'terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy' as ContractAddr,
  },
  [TokenKeyEnum.SPEC]: {
    symbol: 'SPEC',
    name: 'Spectrum Token',
    logo: SPECLogo,
    contractOrDenom:
      'terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr' as ContractAddr,
  },
  [TokenKeyEnum.VKR]: {
    symbol: 'VKR',
    name: 'Valkyrie Token',
    logo: VKRLogo,
    contractOrDenom:
      'terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5' as ContractAddr,
  },
  [TokenKeyEnum.PSI]: {
    symbol: 'PSI',
    name: 'Nexus Psi Token',
    logo: PSILogo,
    contractOrDenom:
      'terra12897djskt9rge8dtmm86w654g7kzckkd698608' as ContractAddr,
  },
  [TokenKeyEnum.KUJI]: {
    symbol: 'KUJI',
    name: 'Kujira KUJI Token',
    logo: KUJILogo,
    contractOrDenom:
      'terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn' as ContractAddr,
  },
  [TokenKeyEnum.ALTE]: {
    symbol: 'ALTE',
    name: 'Altered',
    logo: ALTELogo,
    contractOrDenom:
      'terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv' as ContractAddr,
  },
  [TokenKeyEnum.ASTRO]: {
    symbol: 'ASTRO',
    name: 'Astroport',
    logo: ASTROLogo,
    contractOrDenom:
      'terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3' as ContractAddr,
  },
  [TokenKeyEnum.WHALE]: {
    symbol: 'WHALE',
    name: 'White Whale',
    logo: WHALELogo,
    contractOrDenom:
      'terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz' as ContractAddr,
  },
  [TokenKeyEnum.APOLLO]: {
    symbol: 'APOLLO',
    name: 'Apollo DAO Token',
    logo: APOLLOLogo,
    contractOrDenom:
      'terra100yeqvww74h4yaejj6h733thgcafdaukjtw397' as ContractAddr,
  },
  [TokenKeyEnum.LUNI]: {
    symbol: 'LUNI',
    name: 'LUNI',
    logo: LUNILogo,
    contractOrDenom:
      'terra1m3tdguf59xq3pa2twk5fjte5g6szj5y9x5npy7' as ContractAddr,
  },
  [TokenKeyEnum.TLAND]: {
    symbol: 'TLAND',
    name: 'TerraLand token',
    logo: TLANDLogo,
    contractOrDenom:
      'terra1r5506ckw5tfr3z52jwlek8vg9sn3yflrqrzfsc' as ContractAddr,
  },
  [TokenKeyEnum.ORNE]: {
    symbol: 'ORNE',
    name: 'Orne',
    logo: ORNELogo,
    contractOrDenom:
      'terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf' as ContractAddr,
  },
  [TokenKeyEnum.PLY]: {
    symbol: 'PLY',
    name: 'PlayNity token',
    logo: PLYLogo,
    contractOrDenom:
      'terra13awdgcx40tz5uygkgm79dytez3x87rpg4uhnvu' as ContractAddr,
  },
  [TokenKeyEnum.tSHIBA]: {
    symbol: 'tSHIBA',
    name: 'Terra Shiba',
    logo: tSHIBALogo,
    contractOrDenom:
      'terra140k6k2pmh2lmy4q4wyz5znqmtgwvs3gkgfeevq' as ContractAddr,
  },
  [TokenKeyEnum.LOCAL]: {
    symbol: 'LOCAL',
    name: 'Local Terra',
    logo: LOCALLogo,
    contractOrDenom:
      'terra1vchw83qt25j89zqwdpmdzj722sqxthnckqzxxp' as ContractAddr,
  },
  [TokenKeyEnum.MARS]: {
    symbol: 'MARS',
    name: 'Mars Protocol Token',
    logo: MARSLogo,
    contractOrDenom:
      'terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n' as ContractAddr,
  },
  [TokenKeyEnum.LUNAX]: {
    symbol: 'LUNAX',
    name: 'Stader LunaX Token',
    logo: LUNAXLogo,
    contractOrDenom:
      'terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup' as ContractAddr,
  },
  [TokenKeyEnum.PRISM]: {
    symbol: 'PRISM',
    name: 'Prism Protocol Token',
    logo: PRISMLogo,
    contractOrDenom:
      'terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw' as ContractAddr,
  },
  [TokenKeyEnum.xPRISM]: {
    symbol: 'xPRISM',
    name: 'Prism Governance Token',
    logo: xPRISMLogo,
    contractOrDenom:
      'terra1042wzrwg2uk6jqxjm34ysqquyr9esdgm5qyswz' as ContractAddr,
  },
  [TokenKeyEnum.xASTRO]: {
    symbol: 'xASTRO',
    name: 'Staked Astroport',
    logo: xASTROLogo,
    contractOrDenom:
      'terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7' as ContractAddr,
  },
}

const testnetTokenInfo: Record<TokenKeyEnum, TokenInfoType> = {
  ...tokenInfo,
  [TokenKeyEnum.bLuna]: {
    ...tokenInfo[TokenKeyEnum.bLuna],
    contractOrDenom:
      'terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x' as ContractAddr,
  },
  [TokenKeyEnum.MIAW]: {
    ...tokenInfo[TokenKeyEnum.MIAW],
    contractOrDenom:
      'terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l' as ContractAddr,
  },
  [TokenKeyEnum.MIR]: {
    ...tokenInfo[TokenKeyEnum.MIR],
    contractOrDenom:
      'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u' as ContractAddr,
  },
}

const mainnetTokenList: TokenType[] = [
  {
    ...tokenInfo[TokenKeyEnum.MIAW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra12mzh5cp6tgc65t2cqku5zvkjj8xjtuv5v9whyd' as ContractAddr,
        lp: 'terra1hvz34zmk4h6k896t94vd8d5qjdchhnkdndunzx' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.ALTE,
        pair: 'terra1c7uxt89gap5gcclvhtqvx3wpd0ee2dpjhf0ct6' as ContractAddr,
        lp: 'terra19umy5s6eal7kekrddw792wmcftxvsktc2wxzpf' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.Luna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552' as ContractAddr,
        lp: 'terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6' as ContractAddr,
        lp: 'terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.bLuna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.Luna,
        pair: 'terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w' as ContractAddr,
        lp: 'terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p' as ContractAddr,
        lp: 'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.TWD],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1etdkg9p0fkl8zal6ecp98kypd32q8k3ryced9d' as ContractAddr,
        lp: 'terra1c9wr85y8p8989tr58flz5gjkqp8q2r6murwpm9' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.STT],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1m95udvvdame93kl6j2mk8d03kc982wqgr75jsr' as ContractAddr,
        lp: 'terra14p4srhzd5zng8vghly5artly0s53dmryvg3qc6' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra19pg6d7rrndg4z4t0jhcd7z9nhl3p5ygqttxjll' as ContractAddr,
        lp: 'terra1uwhf02zuaw7grj6gjs7pxt5vuwm79y87ct5p70' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LOTA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta' as ContractAddr,
        lp: 'terra1t4xype7nzjxrzttuwuyh9sglwaaeszr8l78u6e' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.bETH],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1c0afrdc5253tkp5wt7rxhuj42xwyf2lcre0s7c' as ContractAddr,
        lp: 'terra1jvewsf7922dm47wr872crumps7ktxd7srwcgte' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ANC],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs' as ContractAddr,
        lp: 'terra1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3' as ContractAddr,
        lp: 'terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MIR],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra143xxfw5xf62d5m32k3t4eu9s82ccw80lcprzl9' as ContractAddr,
        lp: 'terra17trxzqjetl0q6xxep0s2w743dhw2cay0x47puc' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux' as ContractAddr,
        lp: 'terra17gjf2zehfvnyjtdgua9p9ygquk6gukxe7ucgwh' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MINE],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra134m8n2epp0n40qr08qsvvrzycn2zq4zcpmue48' as ContractAddr,
        lp: 'terra16unvjel8vvtanxjpw49ehvga5qjlstn8c826qe' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra178jydtjvj4gw8earkgnqc80c3hrmqj4kw2welz' as ContractAddr,
        lp: 'terra1rqkyau9hanxtn63mjrdfhpnkpddztv3qav0tq2' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.SPEC],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1tn8ejzw8kpuc87nu42f6qeyen4c7qy35tl8t20' as ContractAddr,
        lp: 'terra1y9kxxm97vu4ex3uy0rgdr5h2vt7aze5sqx7jyl' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.VKR],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra15s2wgdeqhuc4gfg7sfjyaep5cch38mwtzmwqrx' as ContractAddr,
        lp: 'terra1lw36qqz72mxajrfgkv24lahudq3ehmkpc305yc' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1e59utusv5rspqsu8t37h5w887d9rdykljedxw0' as ContractAddr,
        lp: 'terra17fysmcl52xjrs8ldswhz7n6mt37r9cmpcguack' as ContractAddr,
      },
    ],
  },

  {
    ...tokenInfo[TokenKeyEnum.ALTE],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra18adm0emn6j3pnc90ldechhun62y898xrdmfgfz' as ContractAddr,
        lp: 'terra1x3musrr03tl3dy9xhagm6r5nthwwxgx0hezc79' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra1kh2g4fnhvqtnwwpqa84eywn72ve9vdkp5chhlx' as ContractAddr,
        lp: 'terra1c5khguw3ensqawepuxh7vdzfpxa9ulwauhm0r5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.XTRA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1uvchkwq4kv0vhy23c78hyy72zks2hqtpctklh2' as ContractAddr,
        lp: 'terra1pndz6cy4t42qae4m7avkjjyu6vlcrlrx3hep0k' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.aUST],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1z50zu7j39s2dls8k9xqyxc89305up0w7f7ec3n' as ContractAddr,
        lp: 'terra1umup8qvslkayek0af8u7x2r3r5ndhk2fwhdxz5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.GLOW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1p44kn7l233p7gcj0v3mzury8k7cwf4zt6gsxs5' as ContractAddr,
        lp: 'terra1khm4az2cjlzl76885x2n7re48l9ygckjuye0mt' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ATLO],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ycp5lnn0qu4sq4wq7k63zax9f05852xt9nu3yc' as ContractAddr,
        lp: 'terra1l0wqwge0vtfmukx028pluxsr7ee2vk8gl5mlxr' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.XTRA],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1uvchkwq4kv0vhy23c78hyy72zks2hqtpctklh2' as ContractAddr,
        lp: 'terra1pndz6cy4t42qae4m7avkjjyu6vlcrlrx3hep0k' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.aUST],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1z50zu7j39s2dls8k9xqyxc89305up0w7f7ec3n' as ContractAddr,
        lp: 'terra1umup8qvslkayek0af8u7x2r3r5ndhk2fwhdxz5' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.GLOW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1p44kn7l233p7gcj0v3mzury8k7cwf4zt6gsxs5' as ContractAddr,
        lp: 'terra1khm4az2cjlzl76885x2n7re48l9ygckjuye0mt' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ATLO],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ycp5lnn0qu4sq4wq7k63zax9f05852xt9nu3yc' as ContractAddr,
        lp: 'terra1l0wqwge0vtfmukx028pluxsr7ee2vk8gl5mlxr' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LOCAL],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1ltjtvt27ra3vrhyfmv4x4wymez7kwal5tzx3mq' as ContractAddr,
        lp: '' as ContractAddr,
      },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1296jw27cq8svlg4ywm8t84u448p3zs7mcqg9ra' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.MARS],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra15sut89ms4lts4dd5yrcuwcpctlep3hdgeu729f' as ContractAddr,
        lp: '' as ContractAddr,
      },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra19wauh79y42u5vt62c5adt2g5h4exgh26t3rpds' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LUNAX],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1llhpkqd5enjfflt27u3jx0jcp5pdn6s9lfadx3' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.LUNAX],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra1zrzy688j8g6446jzd88vzjzqtywh6xavww92hy' as ContractAddr,
        lp: '' as ContractAddr,
      },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.Luna,
        pair: 'terra1qswfc7hmmsnwf7f2nyyx843sug60urnqgz75zu' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.PRISM],
    pairList: [
      // warning not verified yet
      // {
      //   dex: DexEnum.terraswap,
      //   base: TokenKeyEnum.UST,
      //   pair: 'terra1ag6fqvxz33nqg78830k5c27n32mmqlcrcgqejl' as ContractAddr,
      //   lp: '' as ContractAddr,
      // },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra10nfk6fcz5nc5uru964qmpels9ctg6j0vczjgl7' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.xPRISM],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.PRISM,
        pair: 'terra1urt608par6rkcancsjzm76472phptfwq397gpm' as ContractAddr,
        lp: '' as ContractAddr,
      },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.PRISM,
        pair: 'terra1c868juk7lk9vuvetf0644qgxscsu4xwag6yaxs' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.ASTRO],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1pufczag48fwqhsmekfullmyu02f93flvfc9a25' as ContractAddr,
        lp: '' as ContractAddr,
      },
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
  {
    ...tokenInfo[TokenKeyEnum.xASTRO],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.ASTRO,
        pair: 'terra14q2h9nce4spj8n74g6kppj3yf86qx8hsrqngfh' as ContractAddr,
        lp: '' as ContractAddr,
      },
    ],
  },
]

export const addressTokenMap: Record<string, TokenKeyEnum> = {
  terra1cl7whtrqmz5ldr553q69qahck8xvk80fm33qjx: TokenKeyEnum.ATLO,
  terra13zx49nk8wjavedjzu8xkk95r3t0ta43c9ptul7: TokenKeyEnum.GLOW,
  terra1kvjscdgwuvwc6uzm4rqfjl6nlmuhj28tequlnc: TokenKeyEnum.XTRA,
  terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu: TokenKeyEnum.aUST,
  terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63: TokenKeyEnum.MIAW,
  uusd: TokenKeyEnum.UST,
  uluna: TokenKeyEnum.Luna,
  terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp: TokenKeyEnum.bLuna,
  terra19djkaepjjswucys4npd5ltaxgsntl7jf0xz7w6: TokenKeyEnum.TWD,
  terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n: TokenKeyEnum.STT,
  terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr: TokenKeyEnum.LOTA,
  terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun: TokenKeyEnum.bETH,
  terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76: TokenKeyEnum.ANC,
  terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: TokenKeyEnum.MIR,
  terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz: TokenKeyEnum.mAAPL,
  terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n: TokenKeyEnum.mABNB,
  terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy: TokenKeyEnum.mAMC,
  terra18ej5nsuu867fkx4tuy2aglpvqjrkcrjjslap3z: TokenKeyEnum.mAMD,
  terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2: TokenKeyEnum.mAMZN,
  terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa: TokenKeyEnum.mBABA,
  terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw: TokenKeyEnum.mBTC,
  terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph: TokenKeyEnum.mCOIN,
  terra19ya4jpvjvvtggepvmmj6ftmwly3p7way0tt08r: TokenKeyEnum.mDOT,
  terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx: TokenKeyEnum.mETH,
  terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7: TokenKeyEnum.mFB,
  terra1l5lrxtwd98ylfy09fn866au6dp76gu8ywnudls: TokenKeyEnum.mGLXY,
  terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p: TokenKeyEnum.mGME,
  terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt: TokenKeyEnum.mGOOGL,
  terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v: TokenKeyEnum.mGS,
  terra10h7ry7apm55h4ez502dqdv9gr53juu85nkd4aq: TokenKeyEnum.mIAU,
  terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6: TokenKeyEnum.mMSFT,
  terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k: TokenKeyEnum.mNFLX,
  terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp: TokenKeyEnum.mQQQ,
  terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp: TokenKeyEnum.mSLV,
  terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc: TokenKeyEnum.mSPY,
  terra1u43zu5amjlsgty5j64445fr9yglhm53m576ugh: TokenKeyEnum.mSQ,
  terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh: TokenKeyEnum.mTSLA,
  terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg: TokenKeyEnum.mTWTR,
  terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf: TokenKeyEnum.mUSO,
  terra19cmt6vzvhnnnfsmccaaxzy2uaj06zjktu6yzjx: TokenKeyEnum.mVIXY,
  terra17jnhankdfl8vyzj6vejt7ag8uz0cjc9crkl2h7: TokenKeyEnum.DPH,
  terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy: TokenKeyEnum.MINE,
  terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr: TokenKeyEnum.SPEC,
  terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5: TokenKeyEnum.VKR,
  terra12897djskt9rge8dtmm86w654g7kzckkd698608: TokenKeyEnum.PSI,
  terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn: TokenKeyEnum.KUJI,
  terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv: TokenKeyEnum.ALTE,
  terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3: TokenKeyEnum.ASTRO,
  terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz: TokenKeyEnum.WHALE,
  terra100yeqvww74h4yaejj6h733thgcafdaukjtw397: TokenKeyEnum.APOLLO,
  terra1m3tdguf59xq3pa2twk5fjte5g6szj5y9x5npy7: TokenKeyEnum.LUNI,
  terra1r5506ckw5tfr3z52jwlek8vg9sn3yflrqrzfsc: TokenKeyEnum.TLAND,
  terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf: TokenKeyEnum.ORNE,
  terra13awdgcx40tz5uygkgm79dytez3x87rpg4uhnvu: TokenKeyEnum.PLY,
  terra140k6k2pmh2lmy4q4wyz5znqmtgwvs3gkgfeevq: TokenKeyEnum.tSHIBA,
  terra1vchw83qt25j89zqwdpmdzj722sqxthnckqzxxp: TokenKeyEnum.LOCAL,
  terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n: TokenKeyEnum.MARS,
  terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup: TokenKeyEnum.LUNAX,
  terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw: TokenKeyEnum.PRISM,
  terra1042wzrwg2uk6jqxjm34ysqquyr9esdgm5qyswz: TokenKeyEnum.xPRISM,
  terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7: TokenKeyEnum.xASTRO,
}

export const testnetAddressTokenMap: Record<string, TokenKeyEnum> = {
  uusd: TokenKeyEnum.UST,
  uluna: TokenKeyEnum.Luna,
  terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x: TokenKeyEnum.bLuna,
  terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l: TokenKeyEnum.MIAW,
  terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u: TokenKeyEnum.MIR,
}

const testnetTokenList: TokenType[] = [
  {
    ...testnetTokenInfo[TokenKeyEnum.Luna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.UST,
        pair: 'terra1e49fv4xm3c2znzpxmxs0z2z6y74xlwxspxt38s' as ContractAddr,
        lp: 'terra1dqjpcqej9nxej80u0p56rhkrzlr6w8tp7txkmj' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff' as ContractAddr,
        lp: 'terra1srf30cs8ax73y59gm64lkztnx0zexl8fpv3kx2' as ContractAddr,
      },
    ],
  },
  {
    ...testnetTokenInfo[TokenKeyEnum.bLuna],
    pairList: [
      {
        dex: DexEnum.astroport,
        base: TokenKeyEnum.Luna,
        pair: 'terra1esle9h9cjeavul53dqqws047fpwdhj6tynj5u4' as ContractAddr,
        lp: 'terra14e7z2ll6eweq6cxe6qkvl28hatapmw2uflxcyt' as ContractAddr,
      },
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.Luna,
        pair: 'terra13e4jmcjnwrauvl2fnjdwex0exuzd8zrh5xk29v' as ContractAddr,
        lp: 'terra1tj4pavqjqjfm0wh73sh7yy9m4uq3m2cpmgva6n' as ContractAddr,
      },
    ],
  },
  {
    ...testnetTokenInfo[TokenKeyEnum.MIAW],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1834ku9y7s2swyp2r090pc29c4s06hy9n9drwvy' as ContractAddr,
        lp: 'terra18e4mudt7kdml6lma5fhsydszxpexmxf2ez9hpn' as ContractAddr,
      },
    ],
  },
  {
    ...testnetTokenInfo[TokenKeyEnum.MIR],
    pairList: [
      {
        dex: DexEnum.terraswap,
        base: TokenKeyEnum.UST,
        pair: 'terra1cz6qp8lfwht83fh9xm9n94kj04qc35ulga5dl0' as ContractAddr,
        lp: 'terra1zrryfhlrpg49quz37u90ck6f396l4xdjs5s08j' as ContractAddr,
      },
    ],
  },
]

const mainnetLpOfLpList: LpofLpType[] = [
  {
    token_0_LogoList: [LUNALogo, bLUNALogo],
    token_0_Contract:
      'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2' as ContractAddr,
    token_0_Symbol: 'Luna-bLuna Lp Of Terraswap',
    token_0_Pair:
      'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p' as ContractAddr,
    token_0_Combined: [
      TokenDenomEnum.uluna,
      'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp' as ContractAddr,
    ],
    token_0_ProvideSymbol: 'bLuna',
    token_1_LogoList: [LUNALogo, USTLogo],
    token_1_Contract:
      'terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr' as ContractAddr,
    token_1_Pair:
      'terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6' as ContractAddr,
    token_1_Combined: [TokenDenomEnum.uluna, TokenDenomEnum.uusd],
    token_1_Symbol: 'Luna-UST Lp Of Terraswap',
    token_1_ProvideSymbol: 'Luna',
    lpOfLp_LpTicker: 'LUNAHODL',
    lpOfLp_Lp: 'terra1qxlp0q3z20llu0gz9c7urzw7rmlnchm23yk8xc' as ContractAddr,
    lpOfLp_Pair: 'terra1wrwf3um5vm30vpwnlpvjzgwpf5fjknt68nah05' as ContractAddr,
  },
]

const mainnetLpStakingList: LpStakingType[] = [
  {
    tokenLogo: MIAWLogo,
    tokenContract:
      'terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63' as ContractAddr,
    nativeDenomLogo: USTLogo,
    nativeDenom: TokenDenomEnum.uusd,
    lpContract: 'terra1hvz34zmk4h6k896t94vd8d5qjdchhnkdndunzx' as ContractAddr,
    lpPair: 'terra12mzh5cp6tgc65t2cqku5zvkjj8xjtuv5v9whyd' as ContractAddr,
    lpStaking: 'terra1a7fwra93sw8xy5wz779crks07u3ttf3u4mslfp' as ContractAddr,
  },
]

const testnetLpStakingList: LpStakingType[] = [
  {
    tokenLogo: MIAWLogo,
    tokenContract:
      'terra1qu5fractk8lgq23gh8efvlywal6rsd9ds8r73l' as ContractAddr,
    nativeDenomLogo: USTLogo,
    nativeDenom: TokenDenomEnum.uusd,
    lpContract: 'terra18e4mudt7kdml6lma5fhsydszxpexmxf2ez9hpn' as ContractAddr,
    lpPair: 'terra1834ku9y7s2swyp2r090pc29c4s06hy9n9drwvy' as ContractAddr,
    lpStaking: 'terra17cvsfp5kn2kucvl44vp4r3cwy4aekvrdnmsy5x' as ContractAddr,
  },
]

const address = {
  dexaDeveloper: 'terra19alhg9mfcy0fc658qv26y7kxyjwl88h32v44c4',
}

const mainnetLimitOrder =
  'terra1qd2vhcjq7zva7ftuggdxn2ctrm34umgjcccqux' as ContractAddr
const testnetLimitOrder =
  'terra155qarpe3ftgfjsc4396plnhvn6m8tjcugg7x83' as ContractAddr

export default {
  mainnetTokenList,
  testnetTokenList,
  mainnetLpOfLpList,
  mainnetLpStakingList,
  testnetLpStakingList,
  address,
  mainnetLimitOrder,
  testnetLimitOrder,
  tokenInfo,
  testnetTokenInfo,
  addressTokenMap,
  testnetAddressTokenMap,
}
