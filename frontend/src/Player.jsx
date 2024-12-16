export function Player({ player, id, name, goals, blocks, assists, drops, buttonText, changeList }) {
    return (
      <li>
        <div className="player-info">
          <span className="player-name">
            {name}
          </span>
          <span className="player-goals">
            Goals: {goals}
          </span>

          <span className="player-blocks">
            Blocks: {blocks}
          </span>

          {/* <span className="player-assists">
            Assists: {assists}
          </span> */}

          <span className="player-drops">
            Drops: {drops}
          </span>
        </div>

        <button className="roster-button"
        onClick={() => {
          // addToRoster(id)
          // removeFromPlayers(id)
          changeList(id)
        }}>
          {buttonText}
        </button>
      </li>
    )
}