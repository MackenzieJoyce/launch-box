export default function LaunchTime({launch}) {
    const launchWin = launch.win_open;
    let launchTime = '';
    let localTime = '';

    if (launch.win_open) {
        launchTime = launchWin.slice(11, 13);
        launchTime - 5 < 0 ? localTime = launchTime - 5 + 12 : localTime = launchTime - 5;
        launchTime = localTime + launchWin.slice(13, 16) + ' EST';
    }

    return (
        <p>{launchTime}</p>
    )
}