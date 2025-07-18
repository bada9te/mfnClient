"use client"
import Post from "@/app/[lang]/components/entities/post/post";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectTrackModal from "@/app/[lang]/components/modals/select-track-modal";
import { useState } from "react";
import { Post as TPost, useBattleCreateMutation, useBattleDeleteByIdMutation } from "@/app/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import { useAppSelector } from "@/app/lib/redux/store";
import { getDictionary } from "@/app/translations/dictionaries";
import { config, MFNAddresses } from "@/app/lib/rainbowkit/config"
import { useAccount, useBalance, useSwitchChain, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import ChainImage from "@/app/[lang]/components/common/chain-image/chain-image";
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import { generateDEFAULT_MFN_CONTRACT_CFG } from "@/app/lib/rainbowkit/contract-functions/contract-functions";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Text } from "lucide-react";
import MainButton from "@/app/[lang]/components/common/main-button/main-button";


export const PostPlaceholder = (props: {
    handleSelect: (a: TPost) => void;
    userIsOwner: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
    forceBtn?: boolean;
}) => {
    return (
        <div className="border-2 border-dashed border-white w-80 h-[360px] flex flex-col justify-center items-center bg-base-100 relative rounded-2xl">
            <div className="flex flex-col h-full justify-center items-center">
                <InfoImage text={props.dictionary.forms.battle["select-track"]} image="/assets/icons/logo_clear.png"/>
            </div>
            {
                (props.userIsOwner || props.forceBtn)
                &&
                <SelectTrackModal
                    dictionary={props.dictionary}
                    handleSelect={props.handleSelect}
                    userIsOwner={props.userIsOwner}
                    button={
                        <button type="button" className="mt-5 btn btn-sm rounded-t-none absolute bottom-0 w-full text-base-content">{props.dictionary.forms.battle.select}</button>
                    }
                />
            }
        </div>
    );
}

type Inputs = {
    title: string;
}

export default function BattleForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const { address, chainId } = useAccount();
    const { switchChain } = useSwitchChain();
    const { data: balance } = useBalance({ chainId, address });
    const {register, reset, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [post1, setPost1] = useState<null | TPost>(null);
    const [post2, setPost2] = useState<null | TPost>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [blockchain, setBlockchain] = useState<undefined | number>(56);
    const [useBlockChain, setUseBlockchain] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const { openConnectModal } = useConnectModal();

    const [createBattle] = useBattleCreateMutation();
    const [deleteBattle] = useBattleDeleteByIdMutation();
    const { writeContractAsync } = useWriteContract();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        if (!post1 || !post2) {
            enqueueSnackbar("You probably forgot to select the track", {variant: 'error', autoHideDuration: 3000});
            return;
        }
        setIsLoading(true);

        const input = {
            initiator: user?._id as string,
            post1: post1._id,
            post2: post2._id,
            title: data.title,
        };

        if (useBlockChain && blockchain) {
            if (Number(balance?.value) <= 0) {
                enqueueSnackbar(`Not enough ${balance?.symbol} balance to perform the action`, {variant: 'error', autoHideDuration: 4000});
                return;
            }
            // @ts-ignore
            input.chainId = blockchain;
            // @ts-ignore
            input.contractAddress = MFNAddresses[blockchain];
        }

        enqueueSnackbar("Creating the battle...", { autoHideDuration: 1500 });
        createBattle({
            variables: {
                input
            }
        }).then(async ({data}) => {
            if (useBlockChain) {
                await writeContractAsync({
                    ...generateDEFAULT_MFN_CONTRACT_CFG(Number(chainId)),
                    functionName: 'createBattle',
                    args: [
                        data?.battleCreate._id as string,
                        input.post1,
                        input.post2,
                        1,
                    ],
                }).then(async(hash) => {
                    await waitForTransactionReceipt(config, {
                        hash,
                        confirmations: 2
                    }).then(() => {
                        setPost1(null); setPost2(null);
                        enqueueSnackbar("Battle created", {autoHideDuration: 2000, variant: 'success'});
                    });
                }).catch(err => {
                    console.log(err);
                    deleteBattle({
                        variables: {
                            _id: data?.battleCreate._id as string
                        }
                    });
                    enqueueSnackbar("Error with blockchain interaction, battle was canceled", {variant: 'error', autoHideDuration: 3000})
                })
            } else {
                setPost1(null); setPost2(null);
                enqueueSnackbar("Battle created", {autoHideDuration: 2000, variant: 'success'});
            }
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {variant: 'error', autoHideDuration: 3000});
        }).finally(() => {
            reset();
            setIsLoading(false);
            revalidatePathAction('/battles/in-progress', 'page');
        });
    }


    return (
        <div className="card overflow-hidden bg-base-100 rounded-2xl">
            <div className="card-body m-1 text-base-content bg-base-100 px-4 rounded-2xl">

                <div className="flex flex-row text-3xl font-bold mb-4">
                    {dictionary.forms.battle.setup}
                </div>
                <div className="flex flex-wrap gap-5 mt-5 w-full justify-around mb-10">
                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>{dictionary.forms.battle["your-track"]}</p>
                        {
                            post1
                            ?
                            <Post data={post1} handleRemove={() => setPost1(null)} dictionary={dictionary}/>
                            :
                            <PostPlaceholder
                                userIsOwner={true}
                                handleSelect={setPost1}
                                dictionary={dictionary}
                                forceBtn={true}
                            />
                        }
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>{dictionary.forms.battle["opponents-track"]}</p>
                        {
                            post2
                            ?
                            <Post data={post2} handleRemove={() => setPost2(null)} dictionary={dictionary}/>
                            :
                            <PostPlaceholder
                                userIsOwner={false}
                                handleSelect={setPost2}
                                dictionary={dictionary}
                                forceBtn={true}
                            />
                        }
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms.battle["battle-title"]}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 input-sm bg-base-200">
                            <input type="text" placeholder={dictionary.forms.battle["battle-title"]} className="placeholder:text-gray-200 grow" {
                                ...register("title", {
                                    required: {value: true, message: dictionary.forms.battle["title-requited"]},
                                    minLength: {value: 5, message: `${dictionary.forms.battle["min-length"]} 5`},
                                    maxLength: {value: 20, message: `${dictionary.forms.battle["max-length"]} 20`}
                                })
                            }/>

                            <Text size={16}/>
                        </label>
                        <div className="label">
                            {
                                errors.title &&
                                <span className="label-text-alt text-error">{errors.title.message}</span>
                            }
                        </div>
                    </label>
                    
                    {
                        address?.length 
                        ?
                        <>
                            <div className="form-control mt-2">
                                <label className="label cursor-pointer">
                                <span className="label-text">{dictionary.forms.battle["associate-with-blockchain"]}</span>
                                    <input type="checkbox" className="checkbox" onChange={() => setUseBlockchain(!useBlockChain)}/>
                                </label>
                            </div>
                            <div className="w-full items-center justify-center gap-4 flex flex-col md:flex-row">
                                {
                                    config.chains.map((chain, key) => {
                                        return (
                                            <button 
                                                key={key} 
                                                className={`w-12 h-12 rounded-xl ${blockchain === chain.id && useBlockChain ? "bg-[#1ba39c]" : "bg-base-300"} shadow-xl flex items-center justify-center  hover:bg-[#1ba39c] cursor-pointer disabled:opacity-50 disabled:hover:bg-base-300 disabled:cursor-default`}
                                                disabled={!useBlockChain}
                                                type="button"
                                                onClick={() => setBlockchain(chain.id)}
                                            >
                                                <ChainImage chainId={chain.id}/>
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className="form-control mt-2 px-4 md:px-0">
                            <label className="label cursor-pointer">
                            <span className="label-text">{dictionary.forms.battle["associate-with-blockchain"]}</span>
                                <button type="button" onClick={openConnectModal} className="btn btn-sm bg-indigo-500 hover:bg-indigo-700  text-base-content px-5">
                                    <Image src={"/assets/icons/ethereum-eth.svg"} width={22} height={22} alt="eth" />
                                    <span>{dictionary.forms.battle["connect-wallet"]}</span>
                                </button>
                            </label>
                        </div>
                    }

                    <div className="form-control mt-5 px-0 md:px-0">
                        {
                            (() => {
                                if (chainId !== blockchain && useBlockChain) {
                                    return (
                                        <MainButton onClick={() => switchChain({ chainId: blockchain as number })} color="primary">
                                            Switch to {config.chains.find(i => i.id === blockchain)?.name}
                                        </MainButton>
                                    );
                                } else {
                                    return (
                                        <MainButton disabled={isLoading} type="submit" color="primary">
                                            {
                                                isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                                            }
                                            {dictionary.forms.battle.create} {useBlockChain ? `- ${config.chains.find(i => i.id === blockchain)?.name}` : ""}
                                        </MainButton>
                                    )
                                }
                            })()
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}