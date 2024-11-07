"use client"
import Post from "@/components/entities/post/post";
import InfoImage from "../common/info-image/info-image";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectTrackModal from "../modals/select-track-modal";
import { useState } from "react";
import { Post as TPost, useBattleCreateMutation, useBattleDeleteByIdMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { revalidatePathAction } from "@/actions/revalidation";
import { useAppSelector } from "@/lib/redux/store";
import { getDictionary } from "@/dictionaries/dictionaries";
import { config, MFNAddresses } from "@/config/wagmi";
import { useAccount, useBalance, useSwitchChain, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import ChainImage from "../common/chain-image/chain-image";
import { generateDEFAULT_MFN_CONTRACT_CFG } from "@/utils/contract-functions/contract-functions";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";


export const PostPlaceholder = (props: {
    handleSelect: (a: TPost) => void;
    userIsOwner: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
}) => {
    return (
        <div className="border-2 border-dashed border-white w-80 h-[535px] flex flex-col justify-center items-center glass relative rounded-2xl">
            <div className="flex flex-col h-full justify-center items-center">
                <InfoImage text={props.dictionary.forms.battle["select-track"]} image="/assets/icons/logo_clear.png"/>
            </div>
            <SelectTrackModal
                dictionary={props.dictionary}
                handleSelect={props.handleSelect}
                userIsOwner={props.userIsOwner}
                button={
                    <button type="button" className="mt-5 btn btn-sm btn-primary glass rounded-t-none absolute bottom-0 w-full text-white">{props.dictionary.forms.battle.select}</button>
                }
            />
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
        }).then(({data}) => {
            if (useBlockChain) {
                writeContractAsync({
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
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <div className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl px-0 md:px-4 rounded-2xl">
                <div className="divider divider-primary px-4 md:px-0">{dictionary.forms.battle.setup}</div>
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
                            />
                        }
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-control px-4 md:px-0">
                        <label className="label">
                            <span className="label-text">{dictionary.forms.battle["battle-title"]}</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder={dictionary.forms.battle["battle-title"]}
                            className="input input-bordered shadow-md glass placeholder:text-gray-200" 
                            required
                            {...register("title", {
                                required: {value: true, message: dictionary.forms.battle["title-requited"]},
                                minLength: {value: 5, message: `${dictionary.forms.battle["min-length"]} 5`},
                                maxLength: {value: 20, message: `${dictionary.forms.battle["max-length"]} 20`}
                            })}
                        />
                        {
                            errors.title &&
                            <label className="label">
                                <span className="text-error">{errors.title.message}</span>
                            </label>
                        }
                    </div>
                    
                    {
                        address?.length 
                        ?
                        <>
                            <div className="form-control mt-2">
                                <label className="label cursor-pointer">
                                <span className="label-text">{dictionary.forms.battle["associate-with-blockchain"]}</span>
                                    <input type="checkbox" className="checkbox checkbox-primary" onChange={() => setUseBlockchain(!useBlockChain)}/>
                                </label>
                            </div>
                            <div className="w-full items-center justify-center gap-4 flex flex-col md:flex-row">
                                {
                                    config.chains.map((chain, key) => {
                                        return (
                                            <button 
                                                key={key} 
                                                className={`w-12 h-12 rounded-xl ${blockchain === chain.id && useBlockChain ? "bg-[#1ba39c]" : "bg-base-300"} shadow-xl flex items-center justify-center glass hover:bg-[#1ba39c] cursor-pointer disabled:opacity-50 disabled:hover:bg-base-300 disabled:cursor-default`}
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
                                <button onClick={openConnectModal} className="btn btn-primary btn-sm bg-base-300 glass text-white px-5">
                                    <Image src={"/assets/icons/ethereum-eth.svg"} width={22} height={22} alt="eth" />
                                    <span>{dictionary.forms.battle["connect-wallet"]}</span>
                                </button>
                            </label>
                        </div>
                    }

                    <div className="form-control mt-5 px-4 md:px-0">
                        {
                            (() => {
                                if (chainId !== blockchain && useBlockChain) {
                                    return (
                                        <button type="button" className="btn btn-primary glass text-white" onClick={() => switchChain({ chainId: blockchain as number })}>
                                            Switch to {config.chains.find(i => i.id === blockchain)?.name}
                                        </button>
                                    );
                                } else {
                                    return (
                                        <button type="submit" className="btn btn-primary glass text-white" disabled={isLoading}>
                                            {
                                                isLoading && <span className="loading loading-dots loading-sm"></span>
                                            }
                                            {dictionary.forms.battle.create} {useBlockChain ? `- ${config.chains.find(i => i.id === blockchain)?.name}` : ""}
                                        </button>
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