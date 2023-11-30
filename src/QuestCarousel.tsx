// QuestCarousel.tsx
import React, { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { TextInput } from "@mantine/core";
import "./index.css";
import { NavLink } from "react-router-dom";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

const QuestCarousel: React.FC = () => {
    const [questList, setQuestList] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    //const overlayDuration = 10000; // 10 seconds
    const QUEST_FILE_PATH = "./questlist.txt";

    console.log(QUEST_FILE_PATH);
    useEffect(() => {
        fetchQuestList();
    }, []);

    const fetchQuestList = async () => {
        try {
            const response = await fetch(QUEST_FILE_PATH);
            const text = await response.text();
            const quests = text.split(",");
            setQuestList(quests);
        } catch (error) {
            console.error("Error fetching quest list:", error);
        }
    };

    const filteredQuests = questList.filter((quest) =>
        quest.toLowerCase().includes(searchQuery.toLowerCase())
    );
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
    }
    return (
        <>
            <div className="customContainer">
                <TextInput
                    className="customInput"
                    label="Search for Quest"
                    placeholder="Type in a quest"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                <Carousel
                    className="caroContainer"
                    breakpoints={[
                        { maxWidth: "sm", slideSize: "50%", slideGap: 2 },
                        { maxWidth: "md", slideSize: "50%", slideGap: 4 },
                        { maxWidth: "lg", slideSize: "75%", slideGap: 8 },
                        { maxWidth: "xl", slideSize: "100%", slideGap: 10 },
                    ]}
                    align="start"
                    maw={510}
                    mx="auto"
                    withIndicators
                    height={600}
                    styles={{
                        control: {
                            "&[data-inactive]": {
                                opacity: 0,
                                cursor: "default",
                            },
                        },
                    }}
                    nextControlIcon={<IconArrowRight size={16} />}
                    previousControlIcon={<IconArrowLeft size={16} />}
                >
                    {filteredQuests.map((quest, index) => {
                        let questTEdit = quest.toLowerCase().split(" ");
                        let pattern = /[!,`']/g;
                        let pattern2 = /[! ,'"._]/g;
                        let QuestImage =
                            "/Rewards/" +
                            quest
                                .toLowerCase()
                                .replace(" ", "")
                                .replace(pattern2, "")
                                .replace(" ", "")
                                .replace(" ", "")
                                .replace(" ", "")
                                .replace(" ", "")
                                .replace(" ", "") +
                            "reward.png";
                        console.log(QuestImage);

                        let modifiedQuestVal1 = questTEdit
                            .join("")
                            .replace(pattern, "");
                        console.log(modifiedQuestVal1);
                        return (
                            <Carousel.Slide size={100} key={index}>
                                <NavLink
                                    className="navLink"
                                    to={"/QuestPage"}
                                    state={{
                                        questName: quest,
                                        modified: modifiedQuestVal1,
                                    }}
                                >
                                    <div className="caroQTitle">{quest}</div>
                                </NavLink>

                                <img src={QuestImage} alt="Reward" />
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>
            </div>
        </>
    );
};

export default QuestCarousel;
