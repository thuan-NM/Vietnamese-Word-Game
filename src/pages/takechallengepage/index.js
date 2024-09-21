import React from "react";
import TakeChallenge from "../../components/takechallenge";
import { useSearchParams } from "react-router-dom";

import "./style.css";

export default function TakeChallengePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const challengeType = searchParams.get("challengeType");
  const subjectId = searchParams.get("subjectId");

  return (
    <div className="take-challenge-page">
      <TakeChallenge challengeType={challengeType} subjectId={subjectId} />
    </div>
  );
}
